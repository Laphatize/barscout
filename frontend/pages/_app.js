import '../styles/globals.css'
import { AuthProvider } from '../components/AuthContext';
import BottomNav from '../components/BottomNav';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
      <BottomNav />
    </AuthProvider>
  );
}
