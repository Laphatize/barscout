import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../components/AuthContext';

export default function AddBar() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);
    
    try {
      console.log('Sending with token:', token);
      const res = await fetch('https://barscout-api.ctfguide.com/api/bars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, location, image })
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
            <input 
              type="text" 
              placeholder="Enter location" 
              value={location} 
              onChange={e => setLocation(e.target.value)} 
              required 
              className="input" 
              disabled={isSubmitting}
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
