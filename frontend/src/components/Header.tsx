'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-black">
          LearnHub
          </Link>

          <div className='flex items-center gap-10'>
          <nav className="hidden md:flex space-x-8">
              <a href="/admin" className="text-black hover:text-blue-600">
                Courses
              </a>
              <a href="#" className="text-black hover:text-blue-600">
                About
              </a>
              <a href="#" className="text-black hover:text-blue-600">
                Contact
              </a>
            </nav>

          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-black">
                  Welcome, <span className="font-semibold text-black">{username}</span>
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  tabIndex={0}
                  aria-label="Logout from account"
                  className="text-black border-black hover:bg-gray-100"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button 
                    variant="ghost"
                    tabIndex={0}
                    aria-label="Navigate to login page"
                    className="text-black hover:bg-gray-100"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    tabIndex={0}
                    aria-label="Navigate to signup page"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 