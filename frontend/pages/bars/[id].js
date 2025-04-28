import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import Layout from '../../components/Layout';
import { MapPinIcon, QueueListIcon, StarIcon, CurrencyDollarIcon, UsersIcon, ChevronDownIcon, ShareIcon, HeartIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { useLocation } from '../../context/LocationContext';
import io from 'socket.io-client';

const TRAFFIC_LEVELS = ['Empty', 'Moderate', 'Busy', 'Packed'];
const TRAFFIC_COLORS = {
  'Empty': 'bg-green-500',
  'Moderate': 'bg-yellow-500',
  'Busy': 'bg-orange-500',
  'Packed': 'bg-red-500'
};

// Helper to geocode an address using Google Maps Geocoding API
async function geocodeAddress(address) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return null;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === 'OK' && data.results[0]) {
      return {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      };
    }
  } catch (e) { /* ignore */ }
  return null;
}

// --- Helper: Haversine formula ---
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// --- Gallery Feed Tab ---
function GalleryTab({ barId, token }) {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API}/api/bars/${barId}/gallery?page=1`)
      .then(res => res.json())
      .then(data => {
        setGallery(data);
        setHasMore(data.length > 0);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load gallery.');
        setLoading(false);
      });
  }, [barId]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore) return;
    const handleScroll = () => {
      if (loader.current && loader.current.getBoundingClientRect().top <= window.innerHeight) {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API}/api/bars/${barId}/gallery?page=${page + 1}`)
          .then(res => res.json())
          .then(data => {
            if (data.length === 0) setHasMore(false);
            else {
              setGallery(prev => [...prev, ...data]);
              setPage(prev => prev + 1);
            }
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, hasMore, barId]);

  const handleImageChange = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!image) return setError('Please select an image.');
    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/bars/${barId}/gallery`, {
        method: 'POST',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      setImage(null);
      setCaption('');
      setUploading(false);
      setError('');
      // Trigger gallery refresh
      fetch(`${process.env.NEXT_PUBLIC_API}/api/bars/${barId}/gallery`)
        .then(res => res.json())
        .then(data => setGallery(data));
    } catch (err) {
      setError('Upload failed.');
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      {/* Floating Action Button (FAB) for posting a picture */}
      <button
        type="button"
        aria-label="Post a photo"
        onClick={() => setShowUpload(true)}
        className="fixed z-[110] bottom-20 right-8 md:bottom-10 md:right-10 bg-gradient-to-br from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white rounded-full shadow-2xl w-16 h-16 flex items-center justify-center text-3xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 "
        style={{ boxShadow: '0 6px 32px 0 rgba(0,0,0,0.24)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <form onSubmit={handleSubmit} className="bg-gray-800/90 p-10 rounded-xl flex flex-col gap-3 shadow-2xl max-w-md w-full relative animate-fadeIn">
            <button type="button" onClick={() => setShowUpload(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl focus:outline-none">&times;</button>
            <label className="block text-white font-semibold text-lg mb-2 text-center">Share a photo from this event:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-300 file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="text"
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="Caption (optional)"
              className="block w-full rounded-lg bg-gray-900/80 text-white px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              maxLength={120}
            />
            <button
              type="submit"
              disabled={uploading}
              className="w-full py-2 mt-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition disabled:opacity-60 disabled:cursor-not-allowed shadow"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {error && <div className="text-center text-red-500 text-sm mt-2">{error}</div>}
          </form>
        </div>
      )}
      {/* Gallery Grid */}
      <div className="gallery-grid grid grid-cols-1 w-full gap-y-6 mb-8">
        {gallery.map((item, idx) => (
          <div key={idx} className="gallery-item bg-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col border border-gray-800">
            <img src={item.imageUrl} alt={item.caption} className="w-full h-52 object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div className="text-gray-200 text-sm mb-2 break-words">{item.caption}</div>
              <div className="text-xs text-gray-400 mt-auto">{new Date(item.timestamp).toLocaleString()} - @{item.user?.username || 'User'}</div>
            </div>
          </div>
        ))}
      </div>
      <div ref={loader} />
      {loading && <div className="text-center text-gray-400">Loading...</div>}
      {!hasMore && !loading && <div className="mt-2 text-center text-gray-400">No more images.</div>}
      {error && !showUpload && <div className="text-center text-red-500">{error}</div>}
    </div>
  );
}

export default function BarDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [bar, setBar] = useState(null);
  const [queueStatus, setQueueStatus] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isHere, setIsHere] = useState(false);
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [coverFee, setCoverFee] = useState(20); // Default to $20
  const [traffic, setTraffic] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { getBarPopularity, startTracking, stopTracking, isTracking, nearbyBar } = useLocation();
  const watchIdRef = useRef(null);
  const [liveCount, setLiveCount] = useState(0);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    setSocket(io(process.env.NEXT_PUBLIC_API));
    // Get userId from localStorage or JWT
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
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API}/api/bars/${id}`)
        .then(res => res.json())
        .then(async data => {
          const geo = await geocodeAddress(data.location);
          setBar({ ...data, _geo: geo });
        })
        .finally(() => setLoading(false));

      if (token) {
        fetch(`${process.env.NEXT_PUBLIC_API}/api/queue/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(res => setQueueStatus(res.ok))
          .catch(() => setQueueStatus(false));
      }
    }
  }, [id]);

  // --- Real-time continuous location tracking ---
  useEffect(() => {
    if (bar && bar._geo && socket && userId) {
      if (navigator.geolocation) {
        // Clean up any previous watcher
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
        }
        // Start watching the user's position
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
            const distance = calculateDistance(
              latitude,
              longitude,
              bar._geo.lat,
              bar._geo.lng
            );
            const here = distance < 100; // 100 meters threshold
            setIsHere(here);
            if (here) {
              socket.emit('updateLocation', {
                userId,
                location: { latitude, longitude },
                barId: bar._id
              });
            } else {
              // Optionally emit a leave event if you want
              socket.emit('leaveLocation', {
                userId,
                barId: bar._id
              });
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
        };
      }
    }
  }, [bar, socket, userId]);

  // --- Listen for live popularity updates ---
  useEffect(() => {
    if (!socket || !bar) return;
    const handler = (popularity) => {
      if (popularity && popularity[bar._id]) {
        setLiveCount(popularity[bar._id].count);
      }
    };
    socket.on('popularityUpdate', handler);
    // Request initial count (optional: you could emit a request here)
    return () => socket.off('popularityUpdate', handler);
  }, [socket, bar]);

  useEffect(() => {
    if (id && socket) {
      // Optionally request the current popularity count on mount
      socket.emit('requestPopularity', { barId: id });
    }
  }, [id, socket]);

  const handleJoin = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API}/api/queue/${id}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setQueueStatus(true);
  };

  const handleLeave = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API}/api/queue/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setQueueStatus(false);
  };
  
  const submitRating = async () => {
    setSubmitting(true);
    await fetch(`${process.env.NEXT_PUBLIC_API}/api/bars/${id}/rate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: rating })
    });
    // Refresh bar info
    const barRes = await fetch(`${process.env.NEXT_PUBLIC_API}/api/bars/${id}`);
    setBar(await barRes.json());
    setSubmitting(false);
  };

  const submitCover = async () => {
    setSubmitting(true);
    await fetch(`${process.env.NEXT_PUBLIC_API}/api/bars/${id}/cover`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: Number(coverFee) })
    });
    const barRes = await fetch(`${process.env.NEXT_PUBLIC_API}/api/bars/${id}`);
    setBar(await barRes.json());
    setSubmitting(false);
  };

  const submitTraffic = async () => {
    setSubmitting(true);
    await fetch(`${process.env.NEXT_PUBLIC_API}/api/bars/${id}/traffic`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ level: traffic })
    });
    const barRes = await fetch(`${process.env.NEXT_PUBLIC_API}/api/bars/${id}`);
    setBar(await barRes.json());
    setSubmitting(false);
    setTraffic('');
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, you would save this to the user's profile
  };

  const shareBar = () => {
    if (navigator.share) {
      navigator.share({
        title: bar.name,
        text: `Check out ${bar.name} on BarScout!`,
        url: window.location.href,
      })
      .catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Error copying:', err));
    }
  };

  // Increment/decrement cover fee
  const adjustCoverFee = (amount) => {
    setCoverFee(prev => {
      const newValue = Number(prev) + amount;
      return newValue > 0 ? newValue : 0;
    });
  };

  // Calculate average rating, latest cover, and latest traffic
  const avgRating = bar?.ratings?.length
    ? (bar.ratings.reduce((a, r) => a + r.value, 0) / bar.ratings.length).toFixed(1)
    : 'N/A';
  const latestCover = bar?.coverFees?.length
    ? bar.coverFees[bar.coverFees.length - 1].amount
    : 'N/A';
  const latestTraffic = bar?.trafficReports?.length
    ? bar.trafficReports[bar.trafficReports.length - 1].level
    : 'N/A';

  // Default image if none provided
  const defaultImage = 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1000';

  if (loading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
          <div className="h-64 bg-gray-800 rounded-xl w-full"></div>
          <div className="h-8 bg-gray-800 rounded w-3/4"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 bg-gray-800 rounded"></div>
            <div className="h-24 bg-gray-800 rounded"></div>
            <div className="h-24 bg-gray-800 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!bar) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-500">Bar not found</h2>
          <p className="mt-2 text-gray-400">The bar you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.push('/bars')} 
            className="mt-6 btn-primary"
          >
            Back to Bars
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section with Image Overlay */}
      <div className="relative -mt-4 -mx-6 mb-8">
        <div className="h-[50vh] min-h-[400px] w-full relative">
          <img 
            src={bar.image || defaultImage} 
            alt={bar.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex space-x-3">
            <button 
              onClick={toggleFavorite}
              className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
            >
              <HeartIcon className={`h-6 w-6 ${isFavorite ? 'text-red-500' : 'text-white'}`} />
            </button>
            <button 
              onClick={shareBar}
              className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
            >
              <ShareIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          
          {/* Bar info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">{bar.name}</h1>
                <div className="flex items-center text-gray-200 mb-2">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{bar.location}</span>
                </div>
                
                {/* Stats badges */}
                <div className="flex flex-wrap gap-3 mt-3">
                  {avgRating !== 'N/A' && (
                    <div className="flex items-center bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-white font-medium">{avgRating}</span>
                    </div>
                  )}
                  
                  {latestCover !== 'N/A' && (
                    <div className="flex items-center bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      <CurrencyDollarIcon className="h-4 w-4 text-green-400 mr-1" />
                      <span className="text-white font-medium">${latestCover}</span>
                    </div>
                  )}
                  
                  {latestTraffic !== 'N/A' && (
                    <div className={`flex items-center ${TRAFFIC_COLORS[latestTraffic]} px-3 py-1 rounded-full`}>
                      <UsersIcon className="h-4 w-4 text-white mr-1" />
                      <span className="text-white font-medium">{latestTraffic}</span>
                    </div>
                  )}
                  
                  {/* Live user count */}
                  <div className="flex items-center text-gray-200 bg-blue-500/20 px-3 py-1 rounded-full">
                    <UsersIcon className="h-4 w-4 mr-1 text-blue-400" />
                    <span className="font-medium">Live: {liveCount} {liveCount === 1 ? 'person' : 'people'}</span>
                    {isHere && (
                      <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">You're here!</span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Queue status and button */}
              {token && queueStatus !== null && (
                <div className="mt-4 sm:mt-0">
                  <div className="flex items-center text-gray-200 bg-orange-500/20 px-3 py-1 rounded-full">
                    <QueueListIcon className="h-4 w-4 mr-1 text-orange-400" />
                    <span className="text-white font-medium">Queue: {bar.queueCount}</span>
                    <span className="ml-2">
                      {queueStatus ? (
                        <button onClick={handleLeave} className="py-1 px-3 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-900/30 text-xs">
                          Leave Queue?
                        </button>
                      ) : (
                        <button onClick={handleJoin} className="py-1 px-3 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-900/30 text-xs">
                          Join Queue?
                        </button>
                      )}
                    </span>
                  </div>
                
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Bar Location & Coordinates Section */}
        <div className="mb-6 hidden">
          <h2 className="text-xl font-bold text-white mb-2">Bar Location</h2>
          <div className="bg-gray-800/80 rounded-xl p-4 text-white">
            <div><span className="font-semibold">Address:</span> {bar.location}</div>
            <div><span className="font-semibold">Coordinates:</span> {bar._geo ? `Lat: ${bar._geo.lat.toFixed(6)}, Lng: ${bar._geo.lng.toFixed(6)}` : 'N/A'}</div>
            {bar._geo && (
              <a
                href={`https://www.google.com/maps?q=${bar._geo.lat},${bar._geo.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline ml-2"
              >
                View on Google Maps
              </a>
            )}
            {/* Show "You're here!" if user is at the bar */}
            {isHere && (
              <div className="mt-4 text-green-400 font-bold text-lg">You're here!</div>
            )}
            <div className="mt-2 text-blue-300">Live: {liveCount} {liveCount === 1 ? 'person' : 'people'} here</div>
          </div>
        </div>
        
        {/* Map Section with Toggle */}
        <div className="mb-8 overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50">
          <button 
            onClick={() => setShowMap(!showMap)} 
            className="w-full p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
          >
            <span className="font-medium text-lg">Location & Map</span>
            <ChevronDownIcon className={`h-5 w-5 transition-transform duration-300 ${showMap ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`transition-all duration-500 ease-in-out ${showMap ? 'max-h-96' : 'max-h-0'}`}>
            <iframe
              width="100%"
              height="350"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(bar.location)}&output=embed`}
              allowFullScreen
              loading="lazy"
              className="border-0"
              title={`Map of ${bar.name}`}
            />
          </div>
        </div>
        
        {/* Tabbed Interface */}
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2  rounded-md font-bold transition-colors ${activeTab === 'info' ? 'bg-blue-700 text-white' : 'bg-gray-800 text-gray-300'}`}
            onClick={() => setActiveTab('info')}
          >Info</button>
          <button
            className={`px-4 py-2 rounded-md font-bold transition-colors ${activeTab === 'gallery' ? 'bg-blue-700 text-white' : 'bg-gray-800 text-gray-300'}`}
            onClick={() => setActiveTab('gallery')}
          >Gallery Feed</button>
        </div>
        <div className=" rounded-b-xl mt-2">
          {activeTab === 'info' ? (
            <div>
              {/* User Feedback Section */}
              {token && (
                <div className="space-y-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Share Your Experience</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {/* Rating Card */}
                    <div className="card-body bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-5 backdrop-blur-sm">
                      <h3 className="text-lg font-medium mb-4 text-center">Rate this bar</h3>
                      <div className="flex justify-center mb-4">
                        {[1,2,3,4,5].map(star => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`text-3xl focus:outline-none transition-colors duration-200 ${rating >= star ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-400'}`}
                            disabled={submitting}
                          >
                            <StarIcon className="h-8 w-8" />
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={submitRating}
                        className="btn-primary w-full py-2"
                        disabled={submitting || rating === 0}
                      >Submit Rating</button>
                    </div>
                    
                    {/* Cover Fee Card - ENHANCED BALLER VERSION */}
                    <div className="card-body bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-5 backdrop-blur-sm">
                      <h3 className="text-lg font-medium mb-4 text-center text-white">Submit Cover Fee</h3>
                      
                      <div className="flex items-center justify-center mb-6">
                        <div className="relative flex items-center">
                          <button 
                            onClick={() => adjustCoverFee(-5)}
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/80 hover:bg-gray-700/90 transition-colors z-10 shadow-lg"
                            disabled={submitting || coverFee <= 5}
                          >
                            <MinusIcon className="h-6 w-6 text-white" />
                          </button>
                          
                          <div className="w-44 h-20 mx-2 relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-blue-900/30">
                            <div className="absolute inset-0.5 bg-black/80 rounded-lg flex items-center justify-center">
                              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 flex items-center">
                                <span className="text-3xl mr-1">$</span>
                                <span>{coverFee}</span>
                              </div>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => adjustCoverFee(5)}
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/80 hover:bg-gray-700/90 transition-colors z-10 shadow-lg"
                            disabled={submitting}
                          >
                            <PlusIcon className="h-6 w-6 text-white" />
                          </button>
                        </div>
                      </div>
                      
                      <button
                        onClick={submitCover}
                        className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition disabled:opacity-60 disabled:cursor-not-allowed shadow"
                      >
                        Submit Cover
                      </button>
                    </div>
                    
                    {/* Traffic Report Card */}
                    <div className="card-body bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-5 backdrop-blur-sm">
                      <h3 className="text-lg font-medium mb-4 text-center">Report Traffic</h3>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {TRAFFIC_LEVELS.map(level => (
                          <button
                            key={level}
                            onClick={() => setTraffic(level)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${traffic === level ? `${TRAFFIC_COLORS[level]} text-white ring-2 ring-white` : 'bg-gray-700 hover:bg-gray-600'}`}
                            disabled={submitting}
                          >{level}</button>
                        ))}
                      </div>
                      <button
                        onClick={submitTraffic}
                        className="btn-primary w-full py-2"
                        disabled={submitting || !traffic}
                      >Submit Traffic</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <GalleryTab barId={id} token={token} />
          )}
        </div>
      </div>
    </Layout>
  );
}
