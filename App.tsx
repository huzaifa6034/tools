
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Tool, ToolCategory } from './types';
import { TOOLS_DATA, CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import ToolGrid from './components/ToolGrid';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Tool Components
import QRCodeTool from './tools/QRCodeTool';
import AIImageTool from './tools/AIImageTool';
import JSONTool from './tools/JSONTool';
import PasswordTool from './tools/PasswordTool';
import WordCounterTool from './tools/WordCounterTool';
import TextToSpeechTool from './tools/TextToSpeechTool';
import ImageCompressorTool from './tools/ImageCompressorTool';
import ColorPickerTool from './tools/ColorPickerTool';
import LoremIpsumTool from './tools/LoremIpsumTool';
import MarkdownTool from './tools/MarkdownTool';
import AdminDashboard from './admin/AdminDashboard';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('toolly_favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id: string) => {
    const next = favorites.includes(id) 
      ? favorites.filter(f => f !== id) 
      : [...favorites, id];
    setFavorites(next);
    localStorage.setItem('toolly_favorites', JSON.stringify(next));
  };

  // Map IDs to components
  const toolComponents: Record<string, React.ComponentType> = {
    'qr-gen': QRCodeTool,
    'ai-img': AIImageTool,
    'json-format': JSONTool,
    'pw-gen': PasswordTool,
    'word-count': WordCounterTool,
    'txt-speech': TextToSpeechTool,
    'img-comp': ImageCompressorTool,
    'color-picker': ColorPickerTool,
    'lorem-gen': LoremIpsumTool,
    'md-editor': MarkdownTool
  };

  // Extend data with components for easy routing
  const fullTools: Tool[] = useMemo(() => {
    return (TOOLS_DATA as Tool[]).map(t => ({
      ...t,
      component: toolComponents[t.id] || (() => <div className="p-10 text-center">Tool {t.name} coming soon!</div>)
    }));
  }, []);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 dark:text-white">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar 
              categories={CATEGORIES} 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory}
              favorites={favorites}
              tools={fullTools}
            />
          </div>

          <div className="flex-1">
            <Routes>
              <Route path="/" element={
                <ToolGrid 
                  tools={fullTools} 
                  searchQuery={searchQuery} 
                  activeCategory={activeCategory}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              } />
              <Route path="/admin" element={<AdminDashboard tools={fullTools} />} />
              {fullTools.map(tool => (
                <Route 
                  key={tool.id} 
                  path={`/${tool.slug}`} 
                  element={
                    <ToolContainer tool={tool}>
                      <tool.component />
                    </ToolContainer>
                  } 
                />
              ))}
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

const ToolContainer: React.FC<{ tool: Tool, children: React.ReactNode }> = ({ tool, children }) => {
  useEffect(() => {
    document.title = tool.seoTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', tool.seoDescription);
  }, [tool]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl transform translate-x-1/4 -translate-y-1/4">
          <i className={`fa-solid ${tool.icon}`}></i>
        </div>
        <div className="relative z-10">
          <nav className="flex mb-4 text-sm opacity-80" aria-label="Breadcrumb">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-semibold">{tool.name}</span>
          </nav>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl backdrop-blur-sm">
              <i className={`fa-solid ${tool.icon}`}></i>
            </div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
          </div>
          <p className="text-blue-50 max-w-2xl">{tool.description}</p>
        </div>
      </div>
      <div className="p-6 md:p-10">
        {children}
      </div>
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-t border-slate-100 dark:border-slate-700">
        <h3 className="text-lg font-semibold mb-4">You might also like</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TOOLS_DATA.filter(t => t.id !== tool.id).slice(0, 4).map(t => (
            <Link key={t.id} to={`/${t.slug}`} className="group block">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors">
                <i className={`fa-solid ${t.icon} text-blue-500 mb-2`}></i>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{t.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
