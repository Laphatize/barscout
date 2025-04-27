import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Wine } from 'lucide-react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>BarScout</title>
        <meta name="description" content="BarScout App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Full-screen background with overlay - using fixed positioning */}
   
      
      <div className="w-full  bg-gray-900/70 backdrop-blur-md text-white rounded-2xl shadow-xl  mt-16 mx-auto flex flex-col items-center justify-center min-h-[60vh] border border-gray-800/50">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        {/* Background image */}
        <div 
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage: 'url("/images/bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',

          }}
        ></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-gray-950/70 to-gray-950/90"></div>
      </div>
        <div className="relative w-16 h-16 mb-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 transform -rotate-12">
          <div className="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center">
            <Wine className="w-10 h-10 text-blue-400" />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Bar<span className="text-white">Scout</span></h1>
        <p className="mb-8 text-lg text-gray-300 text-center">Discover, rate, and vibe at the best bars in town. Join the party or help others find the perfect spot!</p>
        {!isLoggedIn ? (
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Link href="/register" className="btn-primary text-center py-3 text-lg rounded-lg font-semibold transition-transform hover:scale-105 duration-300">Create Account</Link>
            <Link href="/login" className="btn-secondary text-center py-3 text-lg rounded-lg font-semibold transition-transform hover:scale-105 duration-300">Login</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Link href="/bars" className="btn-primary text-center py-3 text-lg rounded-lg font-semibold transition-transform hover:scale-105 duration-300">View Bars</Link>
            <Link href="/add-bar" className="btn-secondary text-center py-3 text-lg rounded-lg font-semibold transition-transform hover:scale-105 duration-300">Add a Bar</Link>
          </div>
        )}
        <div className="mt-10 text-sm text-gray-400 text-center">
          BarScout &copy; {new Date().getFullYear()} &mdash; Made for the nightlife.
        </div>
      </div>
    </Layout>
  );
}
