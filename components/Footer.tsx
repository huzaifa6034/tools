
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <i className="fa-solid fa-screwdriver-wrench text-xl"></i>
              </div>
              <span className="text-xl font-bold tracking-tight dark:text-white">Toolly.online</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              The world's most comprehensive suite of professional online tools. Fast, secure, and completely free to use.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><i className="fa-brands fa-twitter text-xl"></i></a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><i className="fa-brands fa-facebook text-xl"></i></a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><i className="fa-brands fa-github text-xl"></i></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-6">Popular Categories</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-600 transition-colors">AI Content Tools</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Developer Utilities</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">PDF & Image Tools</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Security Tools</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-6">Subscribe</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Get notified when we release new tools.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address"
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© 2024 Toolly.online. All rights reserved.</p>
          <div className="flex gap-8 text-xs text-slate-400 uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-200">Site Map</a>
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-200">Status</a>
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-200">API</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
