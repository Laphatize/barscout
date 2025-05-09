import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Wine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  
  const backgrounds = [
    '/images/bg.png',
    'https://collegestats.org/wp-content/uploads/2012/12/21campusbars.jpg',
    'https://cdn.ktar.com/ktar/wp-content/uploads/2015/10/elehefe2.jpg',
    'https://www.collegemagazine.com/wp-content/uploads/2021/03/aa-bars.jpg'
  ];
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    
    const interval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % backgrounds.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const logoVariants = {
    hidden: { rotate: -45, scale: 0.8, opacity: 0 },
    visible: { 
      rotate: -12, 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
        delay: 0.1
      } 
    },
    hover: { 
      rotate: 0,
      scale: 1.1,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    hover: { 
      scale: 1.05,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <Layout>
      <Head>
        <title>BarScout</title>
        <meta name="description" content="BarScout App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      
      <motion.div 
        className="w-full bg-gray-900/70 backdrop-blur-md text-white rounded-2xl shadow-xl  mx-auto flex flex-col items-center justify-center min-h-[60vh] border border-gray-800/50 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ position: 'relative' }}
      >
        <AnimatePresence>
          <motion.div
            key={currentBg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: `url("${backgrounds[currentBg]}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </AnimatePresence>
        
        {/* Gradient overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-1 bg-gradient-to-b from-gray-950/90 via-gray-950/70 to-gray-950/90 -z-10"
        ></motion.div>
        
        <motion.div 
          className="mt-10 relative w-16 h-16 mb-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 transform"
          variants={logoVariants}
          whileHover="hover"
          
        >
          <div className="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center">
            <Wine className="w-10 h-10 text-blue-400" />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-4xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
          variants={itemVariants}
        >
          Bar<span className="text-white">Scout</span>
        </motion.h1>
        
        <motion.p 
          className="mb-8 px-2 text-lg text-gray-300 text-center"
          variants={itemVariants}
        >
          Discover, rate, and vibe at the best bars in town. Join the party or help others find the perfect spot!
        </motion.p>
        
        {!isLoggedIn ? (
          <motion.div 
            className="flex flex-col gap-4 w-full max-w-xs px-4"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link href="/register" className="btn-primary text-center py-3 text-lg rounded-lg font-semibold block w-full">
                Create Account
              </Link>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link href="/login" className="btn-secondary text-center py-3 text-lg rounded-lg font-semibold block w-full">
                Login
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="flex flex-col gap-4 w-full max-w-xs px-4"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link href="/bars" className="btn-primary text-center py-3 text-lg rounded-lg font-semibold block w-full">
                View Bars
              </Link>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link href="/add-bar" className="btn-secondary text-center py-3 text-lg rounded-lg font-semibold block w-full">
                Add a Bar
              </Link>
            </motion.div>
          </motion.div>
        )}
        
        <motion.div 
          className="mt-10 mb-10 text-sm text-gray-400 text-center"
          variants={itemVariants}
        >
          BarScout &copy; {new Date().getFullYear()} &mdash; Made for the nightlife.
        </motion.div>
      </motion.div>
    </Layout>
  );
}
