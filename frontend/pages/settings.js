import Layout from '../components/Layout';
import { useAuth } from '../components/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();
  return (
    <Layout>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-8 mx-auto">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        {user ? (
          <>
            <div className="mb-4">Logged in as <span className="font-semibold">{user.id}</span> ({user.role})</div>
            <button onClick={logout} className="btn-secondary">Logout</button>
          </>
        ) : (
          <div className="text-gray-500">Not logged in.</div>
        )}
      </div>
    </Layout>
  );
}
