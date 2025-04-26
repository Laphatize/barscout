import Link from 'next/link';
import { useRouter } from 'next/router';
import { HomeIcon, MapIcon, PlusCircleIcon, UserIcon } from '@heroicons/react/24/outline';

const navs = [
  { label: 'Home', href: '/', icon: <HomeIcon className="h-6 w-6" /> },
  { label: 'Bars', href: '/bars', icon: <MapIcon className="h-6 w-6" /> },
  { label: 'Add', href: '/add-bar', icon: <PlusCircleIcon className="h-6 w-6" /> },
  { label: 'Profile', href: '/settings', icon: <UserIcon className="h-6 w-6" /> },
];

export default function BottomNav() {
  const router = useRouter();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 flex justify-around py-3 shadow-lg md:hidden">
      {navs.map(({ label, href, icon }) => (
        <Link href={href} key={href}>
          <div className={`flex flex-col items-center ${router.pathname === href ? 'text-blue-400' : 'text-gray-400'} hover:text-blue-300 transition-colors duration-200`}>
            <div className="mb-1">{icon}</div>
            <span className="text-xs font-medium">{label}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
}
