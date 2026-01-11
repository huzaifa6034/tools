
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link, useLocation } = ReactRouterDOM;

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, isDarkMode, setIsDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2.5 rounded-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
                <i className="fa-solid fa-screwdriver-wrench text-xl"></i>
              </div>
              <span className="text-2xl font-black tracking-tight dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                Toolly<span className="text-blue-600">.online</span>
              </span>
            </Link>

            <div className="hidden md:flex relative group">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Search 30+ tools..."
                className="w-80 bg-slate-100 dark:bg-slate-900 border-none rounded-2xl py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
              aria-label="Toggle Theme"
            >
              <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            
            <Link 
              to="/admin" 
              className={`hidden sm:flex p-3 rounded-xl transition-all ${location.pathname === '/admin' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
              title="Admin Dashboard"
            >
              <i className="fa-solid fa-user-shield"></i>
            </Link>

            <button className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95">
              Go Pro
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-slate-100 dark:bg-slate-900"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-4 space-y-4">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-xl py-3 pl-11 pr-4 outline-none dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link 
            to="/admin" 
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 dark:bg-slate-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="fa-solid fa-user-shield text-blue-600"></i>
            <span className="font-bold">Admin Dashboard</span>
          </Link>
          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
