import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Wine } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
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
      
      {/* Full-screen background with overlay - using fixed positioning */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        {/* Background image */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/images/bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></motion.div>
        {/* Gradient overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-gray-950/70 to-gray-950/90"
        ></motion.div>
      </div>
      
      <motion.div 
        className="w-full bg-gray-900/70 backdrop-blur-md text-white rounded-2xl shadow-xl mt-16 mx-auto flex flex-col items-center justify-center min-h-[60vh] border border-gray-800/50"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="relative w-16 h-16 mb-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 transform"
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
          className="mb-8 text-lg text-gray-300 text-center"
          variants={itemVariants}
        >
          Discover, rate, and vibe at the best bars in town. Join the party or help others find the perfect spot!
        </motion.p>
        
        {!isLoggedIn ? (
          <motion.div 
            className="flex flex-col gap-4 w-full max-w-xs"
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
            className="flex flex-col gap-4 w-full max-w-xs"
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
          className="mt-10 text-sm text-gray-400 text-center"
          variants={itemVariants}
        >
          BarScout &copy; {new Date().getFullYear()} &mdash; Made for the nightlife.
        </motion.div>
      </motion.div>
    </Layout>
  );
}
