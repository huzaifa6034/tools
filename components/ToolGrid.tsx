
import React from 'react';
import { Tool, ToolCategory } from '../types';
import ToolCard from './ToolCard';

interface ToolGridProps {
  tools: Tool[];
  searchQuery: string;
  activeCategory: ToolCategory | 'All';
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const ToolGrid: React.FC<ToolGridProps> = ({ tools, searchQuery, activeCategory, favorites, toggleFavorite }) => {
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          {activeCategory === 'All' ? 'All Tools' : `${activeCategory} Tools`}
          <span className="ml-2 text-sm font-normal text-slate-500">({filteredTools.length})</span>
        </h2>
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              isFavorite={favorites.includes(tool.id)}
              toggleFavorite={() => toggleFavorite(tool.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
          <i className="fa-solid fa-face-sad-tear text-4xl text-slate-300 mb-4"></i>
          <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300">No tools found</h3>
          <p className="text-slate-400">Try adjusting your search or category filters.</p>
        </div>
      )}
    </div>
  );
};

export default ToolGrid;
