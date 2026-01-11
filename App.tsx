
import React, { useState, useEffect, useMemo } from 'react';
// Fixing react-router-dom errors by using a robust import strategy to resolve member export issues
import * as ReactRouterDOM from 'react-router-dom';
const { HashRouter, Routes, Route, Link } = ReactRouterDOM;

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
import Base64Tool from './tools/Base64Tool';
import StopwatchTool from './tools/StopwatchTool';
import IPInfoTool from './tools/IPInfoTool';
import MinifierTool from './tools/MinifierTool';
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

  const toolComponents: Record<string, React.ComponentType<any>> = {
    'qr-gen': QRCodeTool,
    'ai-img': AIImageTool,
    'json-format': JSONTool,
    'pw-gen': PasswordTool,
    'word-count': WordCounterTool,
    'txt-speech': TextToSpeechTool,
    'img-comp': ImageCompressorTool,
    'color-picker': ColorPickerTool,
    'lorem-gen': LoremIpsumTool,
    'md-editor': MarkdownTool,
    'b64-tool': Base64Tool,
    'stopwatch': StopwatchTool,
    'ip-info': IPInfoTool,
    'html-min': () => <MinifierTool type="html" />,
    'css-min': () => <MinifierTool type="css" />,
    'js-min': () => <MinifierTool type="js" />
  };

  const fullTools: Tool[] = useMemo(() => {
    return (TOOLS_DATA as Tool[]).map(t => ({
      ...t,
      component: toolComponents[t.id] || (() => (
        <div className="p-20 text-center">
          <i className="fa-solid fa-screwdriver-wrench text-6xl text-slate-200 mb-6"></i>
          <h2 className="text-2xl font-bold mb-2">Tool {t.name} Coming Soon</h2>
          <p className="text-slate-500">We are currently developing the full implementation for this tool.</p>
        </div>
      ))
    }));
  }, []);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 dark:text-white transition-colors duration-300">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
          <div className="hidden lg:block w-72 flex-shrink-0">
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
    window.scrollTo(0, 0);
  }, [tool]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 text-[15rem] transform translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
          <i className={`fa-solid ${tool.icon}`}></i>
        </div>
        <div className="relative z-10">
          <nav className="flex mb-6 text-sm font-medium text-blue-100/70" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{tool.name}</span>
          </nav>
          <div className="flex items-center gap-6 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl shadow-xl border border-white/20">
              <i className={`fa-solid ${tool.icon}`}></i>
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">{tool.name}</h1>
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest mt-2">{tool.category}</span>
            </div>
          </div>
          <p className="text-lg text-blue-50 max-w-2xl font-medium leading-relaxed opacity-90">{tool.description}</p>
        </div>
      </div>
      <div className="p-8 md:p-12">
        {children}
      </div>
    </div>
  );
};

export default App;
