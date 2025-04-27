import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { MapPinIcon, QueueListIcon, StarIcon } from '@heroicons/react/24/solid';

// Haversine formula to calculate distance between two points on Earth
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Convert coordinates from string format to lat/lng object
function parseCoordinates(locationStr) {
  // This is a simple implementation - in a real app, you'd use geocoding
  // For now, we'll just generate random coordinates near NYC for demo purposes
  return {
    lat: 40.7128 + (Math.random() - 0.5) * 0.1, // Random lat near NYC
    lng: -74.006 + (Math.random() - 0.5) * 0.1   // Random lng near NYC
  };
}

export default function Bars() {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [barsWithDistance, setBarsWithDistance] = useState([]);

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
          // Default to NYC if location access is denied
          setUserLocation({ lat: 40.7128, lng: -74.006 });
        }
      );
    }
  }, []);

  // Fetch bars
  useEffect(() => {
    fetch('http://localhost:5001/api/bars')
      .then(res => res.json())
      .then(setBars)
      .finally(() => setLoading(false));
  }, []);

  // Calculate distances when we have both bars and user location
  useEffect(() => {
    if (bars.length && userLocation) {
      const withDistance = bars.map(bar => {
        // In a real app, the coordinates would come from your database
        // For now, we'll parse them from the location string or generate random ones
        const barCoords = parseCoordinates(bar.location);
        const distance = getDistanceFromLatLonInKm(
          userLocation.lat, 
          userLocation.lng, 
          barCoords.lat, 
          barCoords.lng
        );
        
        return {
          ...bar,
          distance: distance,
          coordinates: barCoords
        };
      });
      
      // Sort by distance
      withDistance.sort((a, b) => a.distance - b.distance);
      setBarsWithDistance(withDistance);
    }
  }, [bars, userLocation]);

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
          {barsToDisplay.map(bar => (
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
                    <span className="text-sm">{bar.location}</span>
                  </div>
                  {bar.distance && (
                    <span className="text-sm bg-blue-900/30 px-2 py-0.5 rounded-full">
                      {bar.distance.toFixed(1)} km away
                    </span>
                  )}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <QueueListIcon className="h-4 w-4 mr-1" />
                  <span>Queue: {bar.queueCount}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </Layout>
  );
}
