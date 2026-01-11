
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM;
import { Tool } from '../types.ts';

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, isFavorite, toggleFavorite }) => {
  const getCategoryStyles = (cat: string) => {
    switch(cat) {
      case 'AI': return 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800/30';
      case 'Media': return 'bg-pink-50 text-pink-600 border-pink-100 dark:bg-pink-900/20 dark:text-pink-400 dark:border-pink-800/30';
      case 'Developer': return 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/30';
      case 'Social': return 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30';
      case 'Text': return 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800/30';
      default: return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30';
    }
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-200/50 dark:border-slate-800 hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] hover:border-blue-500/50 transition-all duration-500 tool-card flex flex-col h-full overflow-hidden">
      {tool.isPremium && (
        <div className="absolute top-0 right-0 p-5">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-1 rounded-full text-[8px] font-black text-white px-2 uppercase shadow-lg shadow-orange-500/20">
            Pro
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-8">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${getCategoryStyles(tool.category)}`}>
          <i className={`fa-solid ${tool.icon}`}></i>
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); toggleFavorite(); }}
          className={`p-3 rounded-full transition-all duration-300 ${isFavorite ? 'text-red-500 bg-red-50 dark:bg-red-900/30 scale-110' : 'text-slate-300 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
          aria-label="Toggle Favorite"
        >
          <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
        </button>
      </div>

      <Link to={`/${tool.slug}`} className="flex-1">
        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors mb-3 tracking-tight">
          {tool.name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
          {tool.description}
        </p>
      </Link>

      <div className="mt-8 flex items-center justify-between">
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${getCategoryStyles(tool.category)}`}>
          {tool.category}
        </span>
        <div className="flex items-center gap-1.5 text-amber-400">
           <i className="fa-solid fa-star text-[10px]"></i>
           <span className="text-xs font-black text-slate-400 group-hover:text-amber-500 transition-colors">{tool.rating || '4.8'}</span>
        </div>
      </div>
      
      {/* Hover reveal link */}
      <Link 
        to={`/${tool.slug}`}
        className="absolute inset-0 z-0 bg-transparent"
        aria-label={`Open ${tool.name}`}
      />
    </div>
  );
};

export default ToolCard;
