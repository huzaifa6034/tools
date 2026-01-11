
import React from 'react';
// Fixing react-router-dom errors by using namespace import
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM;
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, isFavorite, toggleFavorite }) => {
  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-900 transition-all duration-300 tool-card">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors ${
          tool.category === 'AI' ? 'bg-purple-100 text-purple-600' :
          tool.category === 'Media' ? 'bg-pink-100 text-pink-600' :
          tool.category === 'Developer' ? 'bg-orange-100 text-orange-600' :
          'bg-blue-100 text-blue-600'
        }`}>
          <i className={`fa-solid ${tool.icon}`}></i>
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); toggleFavorite(); }}
          className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-red-500 bg-red-50' : 'text-slate-300 hover:text-slate-400 hover:bg-slate-50'}`}
        >
          <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
        </button>
      </div>

      <Link to={`/${tool.slug}`} className="block">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors mb-2">
          {tool.name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </Link>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
          {tool.category}
        </span>
        <Link 
          to={`/${tool.slug}`}
          className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Use Tool <i className="fa-solid fa-arrow-right text-xs"></i>
        </Link>
      </div>
    </div>
  );
};

export default ToolCard;
