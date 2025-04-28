import { useState } from 'react';
import Layout from '../components/Layout';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://api-barscout.ctfguide.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('token', data.token);
      window.location.href = '/bars';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-8 mx-auto">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required className="input" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="input" />
          {error && <div className="text-red-500">{error}</div>}
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <div className="mt-4 text-sm">Don't have an account? <a href="/register" className="text-blue-500 underline">Register</a></div>
      </div>
    </Layout>
  );
}
