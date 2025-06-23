import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
        <div className="max-w-full px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-accent text-2xl w-6 h-6"
            >
              <path d="M10 15a7 7 0 1 0 0-10 7 7 0 0 0 0 10z"></path>
              <path d="M17.67 10a6.09 6.09 0 0 0-3.05-3.92"></path>
              <path d="M17.67 10H20v.5"></path>
              <path d="M14 10h2.5"></path>
              <path d="M20 16.5V10"></path>
              <path d="M10 20v-5"></path>
              <path d="M16 20a2 2 0 0 0 4 0v-3a8 8 0 0 0-4-7"></path>
              <path d="M20 20v1"></path>
            </svg>
            <h1 className="font-display font-bold text-xl md:text-2xl text-primary">Flavour Fusion</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <Link href="/" className={`${location === '/' ? 'text-primary' : 'text-neutral-700'} hover:text-primary transition font-medium`}>
              Home
            </Link>
            <Link href="/ingredient-scanner" className={`${location === '/ingredient-scanner' ? 'text-primary' : 'text-neutral-700'} hover:text-primary transition font-medium`}>
              Scanner
            </Link>
            <Link href="/dashboard" className={`${location === '/dashboard' ? 'text-primary' : 'text-neutral-700'} hover:text-primary transition font-medium`}>
              My Kitchen
            </Link>
            <Link href="/profile" className={`${location === '/profile' ? 'text-primary' : 'text-neutral-700'} hover:text-primary transition font-medium`}>
              Profile
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="hidden md:block bg-neutral-100 hover:bg-neutral-200 rounded-full p-2 text-neutral-700" aria-label="Search">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
            <Button className="hidden md:flex items-center gap-2" variant="default">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Sign In</span>
            </Button>
            <button 
              className="md:hidden text-neutral-700" 
              aria-label="Menu" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-accent text-2xl w-6 h-6"
              >
                <path d="M10 15a7 7 0 1 0 0-10 7 7 0 0 0 0 10z"></path>
                <path d="M17.67 10a6.09 6.09 0 0 0-3.05-3.92"></path>
                <path d="M17.67 10H20v.5"></path>
                <path d="M14 10h2.5"></path>
                <path d="M20 16.5V10"></path>
                <path d="M10 20v-5"></path>
                <path d="M16 20a2 2 0 0 0 4 0v-3a8 8 0 0 0-4-7"></path>
                <path d="M20 20v1"></path>
              </svg>
              <h1 className="font-display font-bold text-xl text-primary">Flavour Fusion</h1>
            </div>
            <button 
              className="text-neutral-700" 
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/"
              className="text-neutral-800 hover:text-primary transition text-lg py-2 border-b border-neutral-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/ingredient-scanner"
              className="text-neutral-800 hover:text-primary transition text-lg py-2 border-b border-neutral-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Scanner
            </Link>
            <Link 
              href="/dashboard"
              className="text-neutral-800 hover:text-primary transition text-lg py-2 border-b border-neutral-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Kitchen
            </Link>
            <Link 
              href="/profile"
              className="text-neutral-800 hover:text-primary transition text-lg py-2 border-b border-neutral-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
          </nav>
          <div className="mt-auto">
            <Button className="w-full mb-4">
              Sign In
            </Button>
            <Button className="w-full" variant="outline">
              Create Account
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
