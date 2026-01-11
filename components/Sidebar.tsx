
import React from 'react';
import { Tool, ToolCategory } from '../types';
// Fixing react-router-dom errors by using namespace import
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM;

interface SidebarProps {
  categories: readonly string[];
  activeCategory: string;
  setActiveCategory: (cat: any) => void;
  favorites: string[];
  tools: Tool[];
}

const Sidebar: React.FC<SidebarProps> = ({ categories, activeCategory, setActiveCategory, favorites, tools }) => {
  const favoriteTools = tools.filter(t => favorites.includes(t.id));

  return (
    <aside className="space-y-8 sticky top-24">
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Categories</h3>
        <nav className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat 
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {favoriteTools.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Favorites</h3>
          <div className="space-y-2">
            {favoriteTools.map(tool => (
              <Link 
                key={tool.id}
                to={`/${tool.slug}`}
                className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                  <i className={`fa-solid ${tool.icon} text-xs`}></i>
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h4 className="font-bold mb-2">Pro Plan</h4>
          <p className="text-xs text-blue-100 mb-4">Unlimited AI generations, no ads, and 4K exports.</p>
          <button className="w-full py-2 bg-white text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors">
            Upgrade Now
          </button>
        </div>
        <i className="fa-solid fa-crown absolute bottom-[-10px] right-[-10px] text-6xl text-white/10 rotate-12"></i>
      </div>
    </aside>
  );
};

export default Sidebar;
