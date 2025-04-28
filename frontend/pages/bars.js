import { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';
import { MapPinIcon, QueueListIcon, StarIcon, UsersIcon, FireIcon } from '@heroicons/react/24/solid';
import io from 'socket.io-client';

// Haversine formula to calculate distance between two points on Earth in miles
function getDistanceInMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Radius of the earth in miles
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Convert coordinates from string format to lat/lng object
function parseCoordinates(locationStr) {
  if (!locationStr || typeof locationStr !== 'string') {
    return null;
  }
  const parts = locationStr.split(',').map(s => s.trim());
  if (parts.length !== 2) {
    return null;
  }
  // Try both [lat, lng] and [lng, lat] orders and pick the one closest to the US
  let lat1 = parseFloat(parts[0]);
  let lng1 = parseFloat(parts[1]);
  let lat2 = lng1;
  let lng2 = lat1;
  // Heuristic: US latitudes are roughly 24 to 49, longitudes -125 to -66
  function isUSLike(lat, lng) {
    return lat > 24 && lat < 49 && lng < -66 && lng > -125;
  }
  if (!isNaN(lat1) && !isNaN(lng1) && isUSLike(lat1, lng1)) {
    return { lat: lat1, lng: lng1 };
  }
  if (!isNaN(lat2) && !isNaN(lng2) && isUSLike(lat2, lng2)) {
    return { lat: lat2, lng: lng2 };
  }
  // fallback: original
  if (!isNaN(lat1) && !isNaN(lng1)) {
    return { lat: lat1, lng: lng1 };
  }
  return null;
}

// --- Geocode cache to prevent duplicate API calls ---
const geocodeCache = {};

// Helper to geocode an address using Google Maps Geocoding API
async function geocodeAddress(address) {
  if (geocodeCache[address]) {
    return geocodeCache[address];
  }
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return null;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === 'OK' && data.results[0]) {
      const coords = {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      };
      geocodeCache[address] = coords;
      return coords;
    }
  } catch (e) { /* ignore */ }
  return null;
}

export default function Bars() {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [barsWithDistance, setBarsWithDistance] = useState([]);
  const [popularity, setPopularity] = useState({});
  const [userId, setUserId] = useState(null);
  const [socket, setSocket] = useState(null);
  const watchIdRef = useRef(null);
  const lastBarIdRef = useRef(null);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Error getting location:', error.message);
          setUserLocation({ lat: 40.7128, lng: -74.006 });
        }
      );
    }
  }, []);

  // Setup socket connection and listeners
  useEffect(() => {
    const s = io(process.env.NEXT_PUBLIC_API);
    setSocket(s);
    s.on('popularityUpdate', (pop) => {
      setPopularity(pop);
    });
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          storedUserId = payload.id || payload.userId || payload.sub;
        } catch {}
      }
    }
    if (storedUserId) setUserId(storedUserId);
    return () => s.disconnect();
  }, []);

  // Fetch bars
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API + "/api/bars")
      .then(res => res.json())
      .then(setBars)
      .finally(() => setLoading(false));
  }, []);

  // Calculate distances when we have both bars and user location
  useEffect(() => {
    if (bars.length && userLocation) {
      let cancelled = false;
      const fetchDistances = async () => {
        const withDistance = await Promise.all(bars.map(async bar => {
          let barCoords = null;
          if (bar.coordinates && Array.isArray(bar.coordinates) && bar.coordinates.length === 2) {
            barCoords = { lat: bar.coordinates[1], lng: bar.coordinates[0] };
          } else if (bar.coordinates && bar.coordinates.lat && bar.coordinates.lng) {
            barCoords = { lat: bar.coordinates.lat, lng: bar.coordinates.lng };
          } else if (bar.lat && bar.lng) {
            barCoords = { lat: bar.lat, lng: bar.lng };
          } else {
            barCoords = parseCoordinates(bar.location);
            if (!barCoords && bar.location) {
              // Debounce and cache geocode calls
              if (geocodeCache[bar.location]) {
                barCoords = geocodeCache[bar.location];
              } else {
                barCoords = await geocodeAddress(bar.location);
              }
            }
          }
          let distance = null;
          if (barCoords && typeof barCoords.lat === 'number' && typeof barCoords.lng === 'number') {
            distance = getDistanceInMiles(
              userLocation.lat,
              userLocation.lng,
              barCoords.lat,
              barCoords.lng
            );
            // Debug log for distance calculation
            console.log('[DEBUG] Distance calculation:', {
              userLat: userLocation.lat,
              userLng: userLocation.lng,
              barLat: barCoords.lat,
              barLng: barCoords.lng,
              distanceMiles: distance
            });
          }
          return {
            ...bar,
            distance: distance,
            coordinates: barCoords
          };
        }));
        if (!cancelled) {
          withDistance.sort((a, b) => {
            if (a.distance === null) return 1;
            if (b.distance === null) return -1;
            return a.distance - b.distance;
          });
          setBarsWithDistance(withDistance);
        }
      };
      fetchDistances();
      return () => { cancelled = true; };
    }
  }, [bars, userLocation]);

  // --- Real-time continuous location tracking on discovery page ---
  useEffect(() => {
    if (!barsWithDistance.length || !socket || !userId) return;
    if (navigator.geolocation) {
      // Clean up previous watcher
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          // Find the closest bar within 100m
          let closest = null;
          let minDist = Infinity;
          barsWithDistance.forEach(bar => {
            if (bar.coordinates) {
              const d = getDistanceInMiles(latitude, longitude, bar.coordinates.lat, bar.coordinates.lng) * 1609.34; // miles to meters
              // Debug log for closest bar calculation
              console.log('[DEBUG] Closest bar check:', {
                userLat: latitude,
                userLng: longitude,
                barLat: bar.coordinates.lat,
                barLng: bar.coordinates.lng,
                distanceMeters: d
              });
              if (d < 100 && d < minDist) {
                closest = bar;
                minDist = d;
              }
            }
          });
          // If at a bar, emit updateLocation
          if (closest) {
            if (lastBarIdRef.current !== closest._id) {
              // If previously at a different bar, emit leaveLocation for that bar
              if (lastBarIdRef.current) {
                socket.emit('leaveLocation', { userId, barId: lastBarIdRef.current });
              }
              lastBarIdRef.current = closest._id;
            }
            socket.emit('updateLocation', {
              userId,
              location: { latitude, longitude },
              barId: closest._id
            });
          } else {
            // If not at any bar, emit leaveLocation for previous bar
            if (lastBarIdRef.current) {
              socket.emit('leaveLocation', { userId, barId: lastBarIdRef.current });
              lastBarIdRef.current = null;
            }
          }
        },
        () => setUserLocation(null),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
      );
      // Cleanup on unmount
      return () => {
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
          watchIdRef.current = null;
        }
        if (lastBarIdRef.current) {
          socket.emit('leaveLocation', { userId, barId: lastBarIdRef.current });
          lastBarIdRef.current = null;
        }
      };
    }
  }, [barsWithDistance, socket, userId]);

  const barsToDisplay = barsWithDistance.length > 0 ? barsWithDistance : bars;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8 text-white">Discover Bars</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-700 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {barsToDisplay.map(bar => {
            console.log('[UI DEBUG]', bar.name, bar.distance);
            const live = popularity[bar._id]?.count || 0;
            const isHere = popularity[bar._id]?.users?.hasOwnProperty(userId);
            // Find the max live count among all bars
            const maxLive = Math.max(...barsToDisplay.map(b => popularity[b._id]?.count || 0));
            const isHot = live > 0 && live === maxLive && maxLive > 0;
            return (
              <a key={bar._id} href={`/bars/${bar._id}`} className="card group hover:shadow-2xl hover:shadow-blue-900/10 hover:border-gray-700 transition-all duration-300">
                {bar.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={bar.image} 
                      alt={bar.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    {bar.ratings?.length > 0 && (
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">
                          {(bar.ratings.reduce((a, r) => a + r.value, 0) / bar.ratings.length).toFixed(1)}
                        </span>
                      </div>
                    )}
                    {isHot && (
                      <div className="absolute top-3 left-3 flex items-center bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                        <FireIcon className="h-6 w-6 text-orange-400" title="Popular" />
                        <span className="ml-1 text-xs text-orange-200 font-bold uppercase tracking-wider">Popular</span>
                      </div>
                    )}
                    {live > 0 && (
                      <div className="absolute bottom-3 left-3 bg-blue-900/80 rounded-full px-2 py-1 flex items-center text-blue-200 text-xs">
                        <UsersIcon className="h-4 w-4 mr-1 text-blue-400" />
                        <span>{live} {live === 1 ? 'person' : 'people'} here</span>
                        {isHere && <span className="ml-2 bg-blue-600 text-white px-2 py-0.5 rounded-full">You're here!</span>}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="text-gray-500 text-lg">No image</span>
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{bar.name}</h2>
                  <div className="flex items-center justify-between text-gray-400 mb-3">
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm truncate w-24">{bar.location}</span>
                    </div>
                    {bar.distance !== null && bar.distance !== undefined ? (
                      <span className="text-sm bg-blue-900/30 px-2 py-0.5 rounded-full">
                        {bar.distance < 0.1 ? 'Nearby' : `${bar.distance.toFixed(1)} mi`}
                      </span>
                    ) : (
                      <span className="text-sm bg-gray-700/30 px-2 py-0.5 rounded-full">...</span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <QueueListIcon className="h-4 w-4 mr-1" />
                    <span>Queue: {bar.queueCount}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
