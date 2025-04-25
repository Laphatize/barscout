import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Layout>
      <Head>
        <title>BarScout</title>
        <meta name="description" content="BarScout App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full max-w-xl bg-gray-900 text-white rounded-2xl shadow-xl p-10 mt-16 mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-extrabold mb-4 tracking-tight">Welcome to BarScout</h1>
        <p className="mb-8 text-lg text-gray-300 text-center">Discover, rate, and vibe at the best bars in town. Join the party or help others find the perfect spot!</p>
        {!isLoggedIn ? (
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Link href="/register" className="btn-primary text-center py-3 text-lg rounded-lg font-semibold">Create Account</Link>
            <Link href="/login" className="btn-secondary text-center py-3 text-lg rounded-lg font-semibold">Login</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Link href="/bars" className="btn-primary text-center py-3 text-lg rounded-lg font-semibold">View Bars</Link>
            <Link href="/add-bar" className="btn-secondary text-center py-3 text-lg rounded-lg font-semibold">Add a Bar</Link>
          </div>
        )}
        <div className="mt-10 text-sm text-gray-400 text-center">
          BarScout &copy; {new Date().getFullYear()} &mdash; Made for the nightlife.
        </div>
      </div>
    </Layout>
  );
}
