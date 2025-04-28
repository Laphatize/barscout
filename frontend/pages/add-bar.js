import { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../components/AuthContext';
import PlacesAutocomplete from '../components/PlacesAutocomplete';

export default function AddBar() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [geocodeCache, setGeocodeCache] = useState({});
  const [lastSubmittedLocation, setLastSubmittedLocation] = useState(null);
  const geocodeTimeout = useRef(null);
  const router = useRouter();
  const { user } = useAuth();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  // Helper to geocode address with Google Maps API before submission
  async function geocodeAddress(address) {
    // Use cache to prevent duplicate API calls
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
        const { lat, lng } = data.results[0].geometry.location;
        // Log and validate
        if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
          const coords = [lng, lat];
          setGeocodeCache(prev => ({ ...prev, [address]: coords }));
          console.log('Geocoded coords:', coords);
          return coords;
        } else {
          console.error('Invalid geocode response:', data.results[0].geometry.location);
        }
      } else {
        console.error('Geocoding failed, status:', data.status, data.error_message);
      }
    } catch (e) {
      console.error('Geocoding failed:', e.message);
    }
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);
    if (isSubmitting) return; // Prevent double submits
    setLastSubmittedLocation(location);
    try {
      let coords = null;
      if (location) {
        coords = await geocodeAddress(location);
        if (!coords || coords.length !== 2 || coords.some(n => typeof n !== 'number' || isNaN(n))) {
          setError('Could not determine coordinates for this address. Please check the address and try again.');
          setIsSubmitting(false);
          return;
        }
      }
      console.log('Sending with token:', token, 'coords:', coords);
      const res = await fetch(process.env.NEXT_PUBLIC_API + "/api/bars", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, location, image, coordinates: coords })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || `Failed to add bar: ${res.status} ${res.statusText}`);
      }

      setMessage('Bar added successfully!');
      setName('');
      setLocation('');
      setImage('');

      // Redirect to the bars page after a short delay
      setTimeout(() => {
        router.push('/bars');
      }, 1500);
    } catch (err) {
      console.error('Error adding bar:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="mb-6 text-gray-400">You need to be logged in to add a bar.</p>
          <div className="flex flex-col gap-3">
            <Link href="/login" className="btn-primary">Login</Link>
            <Link href="/register" className="btn-secondary">Create Account</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="card p-8">
        <h2 className="text-2xl font-bold mb-6">Add a Bar</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Bar Name</label>
            <input 
              type="text" 
              placeholder="Enter bar name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              className="input" 
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
            <PlacesAutocomplete
              value={location}
              onChange={setLocation}
              onPlaceSelected={place => {
                // If place has geometry, update geocodeCache immediately
                if (place.geometry && place.geometry.location) {
                  const lat = place.geometry.location.lat();
                  const lng = place.geometry.location.lng();
                  if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
                    const coords = [lng, lat];
                    setGeocodeCache(prev => ({ ...prev, [place.formatted_address || place.name || location]: coords }));
                  }
                }
              }}
              placeholder="Enter address or bar name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Bar Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImage} 
              className="input py-2" 
              disabled={isSubmitting}
            />
            {image && (
              <div className="mt-3 rounded-lg overflow-hidden">
                <img src={image} alt="Preview" className="w-full h-48 object-cover" />
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary mt-2" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Bar...' : 'Add Bar'}
          </button>
          
          {message && <div className="mt-3 p-3 bg-green-900/30 border border-green-700 rounded-lg text-green-400">{message}</div>}
          {error && <div className="mt-3 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-400">{error}</div>}
        </form>
      </div>
    </Layout>
  );
}
