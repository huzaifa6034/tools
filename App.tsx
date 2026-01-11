
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { HashRouter, Routes, Route, Link, useLocation } = ReactRouterDOM;

import { Tool, ToolCategory } from './types.ts';
import { TOOLS_DATA, CATEGORIES } from './constants.tsx';
import Navbar from './components/Navbar.tsx';
import ToolGrid from './components/ToolGrid.tsx';
import Sidebar from './components/Sidebar.tsx';
import Footer from './components/Footer.tsx';
import SEOHeader from './components/SEOHeader.tsx';
import ShareButtons from './components/ShareButtons.tsx';

// Tool Components
import QRCodeTool from './tools/QRCodeTool.tsx';
import AIImageTool from './tools/AIImageTool.tsx';
import JSONTool from './tools/JSONTool.tsx';
import PasswordTool from './tools/PasswordTool.tsx';
import WordCounterTool from './tools/WordCounterTool.tsx';
import TextToSpeechTool from './tools/TextToSpeechTool.tsx';
import ImageCompressorTool from './tools/ImageCompressorTool.tsx';
import ColorPickerTool from './tools/ColorPickerTool.tsx';
import LoremIpsumTool from './tools/LoremIpsumTool.tsx';
import MarkdownTool from './tools/MarkdownTool.tsx';
import Base64Tool from './tools/Base64Tool.tsx';
import StopwatchTool from './tools/StopwatchTool.tsx';
import IPInfoTool from './tools/IPInfoTool.tsx';
import MinifierTool from './tools/MinifierTool.tsx';
import SpeechToTextTool from './tools/SpeechToTextTool.tsx';
import ImageToPDFTool from './tools/ImageToPDFTool.tsx';
import NotepadTool from './tools/NotepadTool.tsx';
import EmojiConverterTool from './tools/EmojiConverterTool.tsx';
import AdminDashboard from './admin/AdminDashboard.tsx';

// Loading Skeleton
const Skeleton = () => (
  <div className="animate-pulse space-y-8">
    <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
    <div className="space-y-4">
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4"></div>
      <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
    </div>
  </div>
);

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const saved = localStorage.getItem('toolly_favorites');
    if (saved) setFavorites(JSON.parse(saved));
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleFavorite = (id: string) => {
    const next = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
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
    'js-min': () => <MinifierTool type="js" />,
    'speech-txt': SpeechToTextTool,
    'img-pdf': ImageToPDFTool,
    'notepad': NotepadTool,
    'emoji-conv': EmojiConverterTool,
    'pal-checker': () => <StringTool mode="palindrome" />,
    'txt-reverse': () => <StringTool mode="reverse" />,
    'b64-img': () => <Base64ImageTool />,
    'url-short': () => <ShortenerTool />,
    'pdf-comp': () => <MockTool name="PDF Compressor" />,
    'vid-mp3': () => <MockTool name="Video to MP3" />,
    'web-shot': () => <MockTool name="Website Screenshot" />,
    'file-conv': () => <MockTool name="File Converter" />,
    'yt-down': () => <MockTool name="YouTube Downloader" />,
    'vid-comp': () => <MockTool name="Video Compressor" />
  };

  const fullTools: Tool[] = useMemo(() => {
    return (TOOLS_DATA as Tool[]).map(t => ({
      ...t,
      component: toolComponents[t.id] || (() => <MockTool name={t.name} />)
    })) as Tool[];
  }, []);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-500">
        <Navbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
        />
        
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex flex-col md:flex-row gap-8">
          <div className="hidden lg:block w-72 flex-shrink-0">
            <Sidebar categories={CATEGORIES} activeCategory={activeCategory} setActiveCategory={setActiveCategory} favorites={favorites} tools={fullTools} />
          </div>
          
          <div className="flex-1">
            <Suspense fallback={<Skeleton />}>
              <Routes>
                <Route path="/" element={<ToolGrid tools={fullTools} searchQuery={searchQuery} activeCategory={activeCategory} favorites={favorites} toggleFavorite={toggleFavorite} />} />
                <Route path="/admin" element={<AdminDashboard tools={fullTools} />} />
                {fullTools.map(tool => (
                  <Route key={tool.id} path={`/${tool.slug}`} element={<ToolWrapper tool={tool}><tool.component /></ToolWrapper>} />
                ))}
              </Routes>
            </Suspense>
          </div>
        </main>
        
        <Footer />
      </div>
    </HashRouter>
  );
}

const ToolWrapper: React.FC<{ tool: Tool, children: React.ReactNode }> = ({ tool, children }) => {
  const location = useLocation();
  const fullUrl = `https://toolly.online/#${location.pathname}`;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <SEOHeader tool={tool} />
      <ToolContainer tool={tool}>
        {children}
        <ShareButtons url={fullUrl} title={`Check out this ${tool.name} on Toolly.online!`} />
      </ToolContainer>
    </div>
  );
};

const ToolContainer: React.FC<{ tool: Tool, children: React.ReactNode }> = ({ tool, children }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800 transition-all duration-500 hover:shadow-blue-500/10">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 md:p-14 text-white relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 text-[15rem] transform translate-x-1/4 -translate-y-1/4 pointer-events-none select-none">
          <i className={`fa-solid ${tool.icon}`}></i>
        </div>
        
        <nav className="flex mb-8 text-sm font-bold text-blue-100/60 uppercase tracking-widest">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-3 opacity-30">/</span>
          <span className="text-white">{tool.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-2xl relative z-10">
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-none">{tool.name}</h1>
            <p className="text-xl text-blue-50/80 leading-relaxed font-medium max-w-lg">{tool.description}</p>
          </div>
          
          <div className="flex items-center gap-6 p-6 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl">
            <div className="text-center border-r border-white/10 pr-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 block mb-2">Rating</span>
              <div className="flex text-amber-400 gap-0.5 text-sm mb-1">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
              </div>
              <span className="text-lg font-black">{tool.rating || '4.8'}</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 block mb-2">Usage</span>
              <div className="text-blue-100 mb-1">
                <i className="fa-solid fa-chart-line text-xs"></i>
              </div>
              <span className="text-lg font-black">1.2k+</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-10 md:p-20 relative">
        {tool.isPremium && (
          <div className="absolute top-0 right-0 m-10">
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20">
              <i className="fa-solid fa-crown mr-2"></i>Premium
            </span>
          </div>
        )}
        
        <div className="tool-content">
          {children}
        </div>

        <div className="mt-20 p-10 bg-slate-50 dark:bg-slate-950/40 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
           <div className="flex items-center gap-4 mb-6">
             <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center text-xl">
               <i className="fa-solid fa-lightbulb"></i>
             </div>
             <h3 className="text-2xl font-black tracking-tight">Pro Guide</h3>
           </div>
           <p className="text-slate-600 dark:text-slate-400 leading-loose text-lg font-medium italic">
             "{tool.tutorial || `To get the best results with ${tool.name}, simply provide your data in the input field above. Our optimized engine handles the heavy lifting in real-time.`}"
           </p>
        </div>
      </div>
    </div>
  );
};

const StringTool = ({ mode }: { mode: 'palindrome' | 'reverse' }) => {
  const [val, setVal] = useState('');
  const result = mode === 'reverse' ? val.split('').reverse().join('') : (val.toLowerCase().replace(/[^a-z0-9]/g, '') === val.toLowerCase().replace(/[^a-z0-9]/g, '').split('').reverse().join('') && val ? 'It is a Palindrome! ✅' : 'Not a palindrome ❌');
  
  return (
    <div className="space-y-10">
      <div className="relative group">
        <textarea 
          className="w-full p-10 text-2xl font-bold border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] dark:bg-slate-800 focus:ring-8 focus:ring-blue-500/10 transition-all outline-none resize-none min-h-[200px]" 
          placeholder="Enter text to analyze..." 
          value={val} 
          onChange={e => setVal(e.target.value)} 
        />
        <div className="absolute bottom-6 right-6 flex gap-3">
           <button onClick={() => setVal('')} className="bg-slate-100 dark:bg-slate-700 p-4 rounded-2xl text-slate-400 hover:text-red-500 transition-colors">
              <i className="fa-solid fa-trash-can"></i>
           </button>
        </div>
      </div>
      
      <div className="p-16 bg-slate-50 dark:bg-slate-950 border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] text-center transform transition-transform hover:scale-[1.01]">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-6">Engine Output</span>
        <div className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white break-all leading-tight">
          {result || <span className="text-slate-200 dark:text-slate-800">Waiting for data...</span>}
        </div>
        {result && (
          <button 
            onClick={() => { navigator.clipboard.writeText(result); alert('Copied!'); }}
            className="mt-10 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all"
          >
            Copy Result
          </button>
        )}
      </div>
    </div>
  );
};

const Base64ImageTool = () => {
  const [b64, setB64] = useState('');
  return (
    <div className="space-y-10">
      <div className="p-8 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex items-center gap-4">
        <i className="fa-solid fa-info-circle text-blue-500 text-xl"></i>
        <p className="text-sm font-medium text-blue-700 dark:text-blue-400">Paste your raw Base64 string to render the image in full resolution.</p>
      </div>
      
      <textarea 
        className="w-full h-48 p-8 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] dark:bg-slate-800 focus:ring-8 focus:ring-blue-500/10 transition-all outline-none font-mono text-sm leading-relaxed" 
        placeholder="data:image/png;base64,iVBORw0KG..." 
        value={b64} 
        onChange={e => setB64(e.target.value)} 
      />
      
      {b64 && (
        <div className="border-8 border-white dark:border-slate-800 shadow-2xl p-4 rounded-[2.5rem] flex flex-col items-center bg-slate-100 dark:bg-slate-950 group">
          <div className="relative overflow-hidden rounded-[1.5rem] mb-8 w-full flex justify-center bg-white">
            <img src={b64} className="max-w-full h-auto transition-transform duration-700 group-hover:scale-105" alt="Decoded" />
          </div>
          <a href={b64} download="decoded-toolly.png" className="px-12 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all uppercase tracking-widest text-xs">
            <i className="fa-solid fa-download mr-3"></i> Download File
          </a>
        </div>
      )}
    </div>
  );
};

const ShortenerTool = () => {
  const [url, setUrl] = useState('');
  const [shortened, setShortened] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleShorten = () => {
    if (!url) return;
    setIsLoading(true);
    setTimeout(() => {
      setShortened(`https://toolly.on/${Math.random().toString(36).substr(2, 6)}`);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        <div className="flex-1 relative">
           <i className="fa-solid fa-link absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"></i>
           <input 
            className="w-full p-6 pl-14 text-lg border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] dark:bg-slate-800 focus:ring-8 focus:ring-blue-500/10 outline-none font-medium" 
            placeholder="Paste your long link here..." 
            value={url} 
            onChange={e => setUrl(e.target.value)} 
          />
        </div>
        <button 
          onClick={handleShorten}
          disabled={isLoading || !url}
          className="px-12 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-[2rem] shadow-xl shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all disabled:opacity-50 uppercase tracking-widest text-xs"
        >
          {isLoading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : 'Shorten Now'}
        </button>
      </div>

      {shortened && (
        <div className="p-10 bg-blue-50 dark:bg-blue-900/20 rounded-[2.5rem] border-2 border-blue-100 dark:border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-6 animate-in zoom-in duration-500">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">Short Link Created</span>
            <span className="font-black text-blue-700 dark:text-blue-400 text-3xl tracking-tight">{shortened}</span>
          </div>
          <button 
            onClick={() => { navigator.clipboard.writeText(shortened); alert('Copied!'); }} 
            className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-blue-600 font-bold hover:shadow-lg transition-all"
          >
            <i className="fa-solid fa-copy"></i> Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

const MockTool = ({ name }: { name: string }) => (
  <div className="p-24 text-center bg-slate-50 dark:bg-slate-950/50 rounded-[4rem] border-4 border-dashed border-slate-200 dark:border-slate-800">
    <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 animate-bounce transition-all duration-[2000ms]">
      <i className="fa-solid fa-rocket text-5xl"></i>
    </div>
    <h2 className="text-4xl font-black mb-6 tracking-tighter">Accelerating Tool: {name}</h2>
    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed mb-12">
      This professional utility is currently undergoing performance stress tests in our cloud environment. 
      <span className="block mt-6 font-black text-blue-600 uppercase tracking-widest text-sm italic underline decoration-wavy underline-offset-8">Status: Infrastructure Provisioning</span>
    </p>
    <div className="flex flex-wrap gap-4 justify-center">
      <Link to="/" className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all text-xs uppercase tracking-widest">Explore Others</Link>
      <button className="px-10 py-4 border-4 border-slate-200 dark:border-slate-800 font-black rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all text-xs uppercase tracking-widest">Early Access</button>
    </div>
  </div>
);
