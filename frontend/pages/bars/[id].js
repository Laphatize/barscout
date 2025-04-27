import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { MapPinIcon, QueueListIcon, StarIcon, CurrencyDollarIcon, UsersIcon } from '@heroicons/react/24/solid';

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
  const [coverFee, setCoverFee] = useState('');
  const [traffic, setTraffic] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5001/api/bars/${id}`)
        .then(res => res.json())
        .then(setBar)
        .finally(() => setLoading(false));

      if (token) {
        fetch(`http://localhost:5001/api/queue/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(res => setQueueStatus(res.ok))
          .catch(() => setQueueStatus(false));
      }
    }
  }, [id]);

  const handleJoin = async () => {
    await fetch(`http://localhost:5001/api/queue/${id}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setQueueStatus(true);
  };

  const handleLeave = async () => {
    await fetch(`http://localhost:5001/api/queue/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setQueueStatus(false);
  };

  const submitRating = async () => {
    setSubmitting(true);
    await fetch(`http://localhost:5001/api/bars/${id}/rate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: rating })
    });
    // Refresh bar info
    const barRes = await fetch(`http://localhost:5001/api/bars/${id}`);
    setBar(await barRes.json());
    setSubmitting(false);
  };

  const submitCover = async () => {
    setSubmitting(true);
    await fetch(`http://localhost:5001/api/bars/${id}/cover`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: Number(coverFee) })
    });
    const barRes = await fetch(`http://localhost:5001/api/bars/${id}`);
    setBar(await barRes.json());
    setSubmitting(false);
    setCoverFee('');
  };

  const submitTraffic = async () => {
    setSubmitting(true);
    await fetch(`http://localhost:5001/api/bars/${id}/traffic`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ level: traffic })
    });
    const barRes = await fetch(`http://localhost:5001/api/bars/${id}`);
    setBar(await barRes.json());
    setSubmitting(false);
    setTraffic('');
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

  return (
    <Layout>
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
      ) : bar && (
        <div className="card">
          {bar.image && (
            <div className="h-56 sm:h-64 w-full overflow-hidden">
              <img src={bar.image} alt={bar.name} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-4 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-bold mb-2">{bar.name}</h1>
            <div className="flex items-center text-gray-400 mb-6">
              <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
              <span className="text-sm sm:text-base">{bar.location}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-gray-800 rounded-lg p-2 sm:p-4 flex flex-col items-center justify-center">
                <div className="flex items-center mb-1">
                  <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-1" />
                  <span className="text-lg sm:text-xl font-bold">{avgRating}</span>
                </div>
                <span className="text-xs text-gray-400">Rating</span>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-2 sm:p-4 flex flex-col items-center justify-center">
                <div className="flex items-center mb-1">
                  <CurrencyDollarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-1" />
                  <span className="text-lg sm:text-xl font-bold">${latestCover}</span>
                </div>
                <span className="text-xs text-gray-400">Cover Fee</span>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-2 sm:p-4 flex flex-col items-center justify-center">
                <div className="flex items-center mb-1">
                  <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-1" />
                  <span className="text-lg sm:text-xl font-bold truncate max-w-[60px] sm:max-w-full">{latestTraffic}</span>
                </div>
                <span className="text-xs text-gray-400">Traffic</span>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <QueueListIcon className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" />
              <span className="text-base sm:text-lg">Queue: <span className="font-bold">{bar.queueCount}</span></span>
              {token && (
                <div className="ml-auto">
                  {queueStatus ? (
                    <button onClick={handleLeave} className="btn-secondary text-xs sm:text-sm py-1 px-2 sm:px-3">
                      Leave Queue
                    </button>
                  ) : (
                    <button onClick={handleJoin} className="btn-primary text-xs sm:text-sm py-1 px-2 sm:px-3">
                      Join Queue
                    </button>
                  )}
                </div>
              )}
            </div>

            {token && (
              <div className="border-t border-gray-800 pt-6 mt-6 space-y-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Share Your Experience</h2>
                
                <div className="card-body bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-medium mb-3">Rate this bar</h3>
                  <div className="flex items-center">
                    <div className="flex">
                      {[1,2,3,4,5].map(star => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`text-xl sm:text-2xl focus:outline-none transition-colors duration-200 ${rating >= star ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-400'}`}
                          disabled={submitting}
                        >
                          <StarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={submitRating}
                      className="ml-auto btn-primary text-xs sm:text-sm py-1 px-2"
                      disabled={submitting || rating === 0}
                    >Submit</button>
                  </div>
                </div>
                
                <div className="card-body bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-medium mb-3">Submit Cover Fee</h3>
                  <div className="flex items-center">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={coverFee}
                        onChange={e => setCoverFee(e.target.value)}
                        className="pl-8 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-24 sm:w-32 text-sm"
                        disabled={submitting}
                      />
                    </div>
                    <button
                      onClick={submitCover}
                      className="ml-auto btn-primary text-xs sm:text-sm py-1 px-2"
                      disabled={submitting || !coverFee}
                    >Submit</button>
                  </div>
                </div>
                
                <div className="card-body bg-gray-800/50 rounded-lg p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-medium mb-3">Report Traffic</h3>
                  <div className="flex flex-wrap gap-2">
                    {TRAFFIC_LEVELS.map(level => (
                      <button
                        key={level}
                        onClick={() => setTraffic(level)}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${traffic === level ? `${TRAFFIC_COLORS[level]} text-white ring-2 ring-white` : 'bg-gray-700 hover:bg-gray-600'}`}
                        disabled={submitting}
                      >{level}</button>
                    ))}
                    <button
                      onClick={submitTraffic}
                      className="ml-auto btn-primary text-xs sm:text-sm py-1 px-2"
                      disabled={submitting || !traffic}
                    >Submit</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
