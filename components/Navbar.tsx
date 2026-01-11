
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <i className="fa-solid fa-screwdriver-wrench text-xl"></i>
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Toolly.online
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-full bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                placeholder="Search 30+ tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
             <Link to="/admin" className="text-slate-500 hover:text-blue-600 text-sm font-medium">
               Admin
             </Link>
             <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
               <i className="fa-solid fa-moon text-slate-500 dark:text-slate-400"></i>
             </button>
             <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors hidden sm:block">
               Go Premium
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
