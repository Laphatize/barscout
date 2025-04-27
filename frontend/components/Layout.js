import React from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';
import { HomeIcon, MapIcon, PlusCircleIcon, UserIcon, ArrowRightOnRectangleIcon, UserPlusIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Wine } from 'lucide-react';

export default function Layout({ children }) {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen bg-gray-950 text-white transition-colors">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 shadow-xl p-6 border-r border-gray-800 mx-auto">
        <div className="mb-10 mx-auto">
          <div className="mx-auto flex items-center space-x-1">
            <div className="relative w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 transform -rotate-12">
              <div className="absolute inset-0.5 bg-gray-900 rounded-md flex items-center justify-center">
              <Wine className="w-10 h-10 text-blue-400" />

              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Bar<span className="text-white">Scout</span></span>
          </div>
        </div>
        <nav className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-3 rounded-lg px-4 py-2.5 hover:bg-gray-800 transition-all duration-200">
            <HomeIcon className="h-5 w-5 text-gray-400" />
            <span>Home</span>
          </Link>
          <Link href="/bars" className="flex items-center gap-3 rounded-lg px-4 py-2.5 hover:bg-gray-800 transition-all duration-200">
            <MapIcon className="h-5 w-5 text-gray-400" />
            <span>Bars</span>
          </Link>
          <Link href="/add-bar" className="flex items-center gap-3 rounded-lg px-4 py-2.5 hover:bg-gray-800 transition-all duration-200">
            <PlusCircleIcon className="h-5 w-5 text-gray-400" />
            <span>Add Bar</span>
          </Link>
          <Link href="/settings" className="flex items-center gap-3 rounded-lg px-4 py-2.5 hover:bg-gray-800 transition-all duration-200">
            <UserIcon className="h-5 w-5 text-gray-400" />
            <span>Profile</span>
          </Link>
          {!user && (
            <>
              <Link href="/login" className="flex items-center gap-3 rounded-lg px-4 py-2.5 hover:bg-gray-800 transition-all duration-200">
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400" />
                <span>Login</span>
              </Link>
              <Link href="/register" className="flex items-center gap-3 rounded-lg px-4 py-2.5 hover:bg-gray-800 transition-all duration-200">
                <UserPlusIcon className="h-5 w-5 text-gray-400" />
                <span>Register</span>
              </Link>
            </>
          )}
          {user?.role === 'admin' && (
            <Link href="/admin" className="flex items-center gap-3 rounded-lg px-4 py-2.5 hover:bg-gray-800 transition-all duration-200">
              <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
              <span>Admin</span>
            </Link>
          )}
        </nav>
        <div className="mt-auto pt-8 text-xs text-gray-500">{new Date().getFullYear()} BarScout</div>
      </aside>
      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 shadow-md md:hidden mx-auto">
          <div className="flex items-center space-x-1">
            <div className="relative w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 transform -rotate-12">
              <div className="absolute inset-0.5 bg-gray-900 rounded-md flex items-center justify-center">
              <Wine className="w-5 h-5 text-blue-400" />

              </div>
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Bar<span className="text-white">Scout</span></span>
          </div>
        </header>
        {/* Content area with consistent padding */}
        <main className="flex-1 p-4 flex flex-col items-center pb-20 md:pb-6">
          <div className="w-full max-w-xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
