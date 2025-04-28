import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { MapPinIcon, QueueListIcon, StarIcon, CurrencyDollarIcon, UsersIcon, ChevronDownIcon, ShareIcon, HeartIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

const TRAFFIC_LEVELS = ['Empty', 'Moderate', 'Busy', 'Packed'];
const TRAFFIC_COLORS = {
  'Empty': 'bg-green-500',
  'Moderate': 'bg-yellow-500',
  'Busy': 'bg-orange-500',
  'Packed': 'bg-red-500'
};

export default function BarDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [bar, setBar] = useState(null);
  const [queueStatus, setQueueStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [coverFee, setCoverFee] = useState(20); // Default to $20
  const [traffic, setTraffic] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (id) {
      fetch(`https://barscout-api.ctfguide.com/api/bars/${id}`)
        .then(res => res.json())
        .then(setBar)
        .finally(() => setLoading(false));

      if (token) {
        fetch(`https://barscout-api.ctfguide.com/api/queue/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(res => setQueueStatus(res.ok))
          .catch(() => setQueueStatus(false));
      }
    }
  }, [id]);

  const handleJoin = async () => {
    await fetch(`https://barscout-api.ctfguide.com/api/queue/${id}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setQueueStatus(true);
  };

  const handleLeave = async () => {
    await fetch(`https://barscout-api.ctfguide.com/api/queue/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setQueueStatus(false);
  };

  const submitRating = async () => {
    setSubmitting(true);
    await fetch(`https://barscout-api.ctfguide.com/api/bars/${id}/rate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: rating })
    });
    // Refresh bar info
    const barRes = await fetch(`https://barscout-api.ctfguide.com/api/bars/${id}`);
    setBar(await barRes.json());
    setSubmitting(false);
  };

  const submitCover = async () => {
    setSubmitting(true);
    await fetch(`https://barscout-api.ctfguide.com/api/bars/${id}/cover`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: Number(coverFee) })
    });
    const barRes = await fetch(`https://barscout-api.ctfguide.com/api/bars/${id}`);
    setBar(await barRes.json());
    setSubmitting(false);
  };

  const submitTraffic = async () => {
    setSubmitting(true);
    await fetch(`https://barscout-api.ctfguide.com/api/bars/${id}/traffic`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ level: traffic })
    });
    const barRes = await fetch(`https://barscout-api.ctfguide.com/api/bars/${id}`);
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
                </div>
              </div>
              
              {/* Queue status and button */}
              {token && queueStatus !== null && (
                <div className="mt-4 sm:mt-0">
                  <div className="flex items-center mb-2 justify-end">
                    <QueueListIcon className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-white font-medium">Queue: {bar.queueCount}</span>
                  </div>
                  {queueStatus ? (
                    <button onClick={handleLeave} className="btn-secondary w-full sm:w-auto">
                      Leave Queue
                    </button>
                  ) : (
                    <button onClick={handleJoin} className="btn-primary w-full sm:w-auto">
                      Join Queue
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
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
        
        {/* User Feedback Section */}
        {token && (
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Share Your Experience</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-900/30"
                  disabled={submitting}
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
    </Layout>
  );
}
