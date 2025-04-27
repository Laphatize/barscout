import { useState } from 'react';
import Layout from '../components/Layout';

export default function Admin() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const handleAddBar = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:5001/api/admin/bars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, location })
      });
      if (!res.ok) throw new Error('Failed to add bar');
      setMessage('Bar added!');
      setName('');
      setLocation('');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-8 mx-auto">
        <h2 className="text-2xl font-bold mb-6">Admin: Add Bar</h2>
        <form onSubmit={handleAddBar} className="flex flex-col gap-4">
          <input type="text" placeholder="Bar Name" value={name} onChange={e => setName(e.target.value)} required className="input" />
          <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required className="input" />
          <button type="submit" className="btn-primary">Add Bar</button>
          {message && <div className="mt-2 text-sm text-green-500">{message}</div>}
        </form>
      </div>
    </Layout>
  );
}
