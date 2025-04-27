import { useState } from 'react';
import Layout from '../components/Layout';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Registration failed');
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-8 mx-auto">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required className="input" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="input" />
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">Registration successful! <a href="/login" className="underline">Login</a></div>}
          <button type="submit" className="btn-primary">Register</button>
        </form>
        <div className="mt-4 text-sm">Already have an account? <a href="/login" className="text-blue-500 underline">Login</a></div>
      </div>
    </Layout>
  );
}
