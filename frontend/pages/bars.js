import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { MapPinIcon, QueueListIcon, StarIcon } from '@heroicons/react/24/solid';

export default function Bars() {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/bars')
      .then(res => res.json())
      .then(setBars)
      .finally(() => setLoading(false));
  }, []);

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
          {bars.map(bar => (
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
                <div className="flex items-center text-gray-400 mb-3">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm">{bar.location}</span>
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
