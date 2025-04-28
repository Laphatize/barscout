import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyBar, setNearbyBar] = useState(null);
  const [barPopularity, setBarPopularity] = useState({});
  const [userId, setUserId] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  // --- USER ID STATE AND RETRIEVAL ---
  useEffect(() => {
    // Try to get userId from localStorage or JWT
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      // If you use JWT in localStorage, extract user id
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Decode JWT (naive, no validation)
          const payload = JSON.parse(atob(token.split('.')[1]));
          storedUserId = payload.id || payload.userId || payload.sub;
        } catch (e) {}
      }
    }
    if (storedUserId) setUserId(storedUserId);
  }, []);

  // --- API BASE URL HANDLING ---
  // Use env var if available, fallback to localhost
  const API_BASE_URL = process.env.NEXT_PUBLIC_API || 'http://localhost:5001';

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(API_BASE_URL);
    setSocket(newSocket);

    // Listen for popularity updates
    newSocket.on('popularityUpdate', (data) => {
      setBarPopularity(data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Helper to geocode an address using Google Maps Geocoding API
  async function geocodeAddress(address) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return null;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try { 
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK' && data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        return [lng, lat]; // GeoJSON order: [lng, lat]
      }
    } catch (e) {}
    return null;
  }

  function parseCoordinates(locationStr) {
    if (!locationStr || typeof locationStr !== 'string') return null;
    const parts = locationStr.split(',').map(s => s.trim());
    if (parts.length !== 2) return null;
    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);
    if (isNaN(lat) || isNaN(lng)) return null;
    return [lng, lat]; // GeoJSON order
  }

  // Get coordinates from any bar object (sync or async)
  async function getBarCoordinates(bar) {
    if (bar.location && Array.isArray(bar.location.coordinates)) {
      return bar.location.coordinates;
    }
    if (bar.coordinates && bar.coordinates.lat && bar.coordinates.lng) {
      return [bar.coordinates.lng, bar.coordinates.lat];
    }
    if (bar.lat && bar.lng) {
      return [bar.lng, bar.lat];
    }
    let parsed = parseCoordinates(bar.location);
    if (parsed) return parsed;
    return await geocodeAddress(bar.location);
  }

  // Start tracking location
  const startTracking = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setIsTracking(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        checkNearbyBars({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsTracking(false);
      }
    );
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        checkNearbyBars({ latitude, longitude });
      },
      (error) => {
        console.error('Error tracking location:', error);
        setIsTracking(false);
      }
    );
    return watchId;
  };

  // Stop tracking location
  const stopTracking = (watchId) => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }
    setIsTracking(false);

    // If user was at a bar, send leaveBar event
    if (nearbyBar && userId) {
      socket.emit('leaveBar', { userId, barId: nearbyBar });
      setNearbyBar(null);
    }
  };

  // Only use bars with coordinates for proximity checks
  const checkNearbyBars = async (location) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bars`);
      const bars = await response.json();
      // Filter bars to only those with coordinates
      const barsWithCoords = bars.filter(bar =>
        bar.location && Array.isArray(bar.location.coordinates) && bar.location.coordinates.length === 2
      );
      const closestBar = await findClosestBar(location, barsWithCoords);
      console.log('checkNearbyBars called. Closest bar:', closestBar, 'NearbyBar:', nearbyBar);
      console.log('userId:', userId, 'socket:', socket);
      if (closestBar) {
        setNearbyBar(closestBar._id);
        if (socket && userId) {
          // Debug log for frontend emission
          console.log('Emitting updateLocation:', {
            userId,
            location,
            barId: closestBar._id
          });
          socket.emit('updateLocation', {
            userId,
            location,
            barId: closestBar._id
          });
        }
      } else if (nearbyBar) {
        if (socket && userId) {
          socket.emit('leaveBar', { userId, barId: nearbyBar });
        }
        setNearbyBar(null);
      }
    } catch (error) {
      console.error('Error checking nearby bars:', error);
    }
  };

  // Find the closest bar within range
  const findClosestBar = async (userLocation, bars) => {
    const MAX_DISTANCE = 100; // meters
    let closestBar = null;
    let minDistance = Infinity;
    for (const bar of bars) {
      const coords = await getBarCoordinates(bar);
      if (coords) {
        const [longitude, latitude] = coords;
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          latitude,
          longitude
        );
        if (distance < MAX_DISTANCE && distance < minDistance) {
          minDistance = distance;
          closestBar = bar;
        }
      }
    }
    return closestBar;
  };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    return distance; // Distance in meters
  };

  // Get popularity count for a specific bar
  const getBarPopularity = (barId) => {
    return barPopularity[barId]?.count || 0;
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        barPopularity,
        nearbyBar,
        isTracking,
        startTracking,
        stopTracking,
        getBarPopularity
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
