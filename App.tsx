
import React, { useState, useEffect, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { HashRouter, Routes, Route, Link } = ReactRouterDOM;

import { Tool, ToolCategory } from './types.ts';
import { TOOLS_DATA, CATEGORIES } from './constants.tsx';
import Navbar from './components/Navbar.tsx';
import ToolGrid from './components/ToolGrid.tsx';
import Sidebar from './components/Sidebar.tsx';
import Footer from './components/Footer.tsx';

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

export default function App() {
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
    'js-min': () => <MinifierTool type="js" />,
    'speech-txt': SpeechToTextTool,
    'img-pdf': ImageToPDFTool,
    'notepad': NotepadTool,
    'emoji-conv': EmojiConverterTool,
    'pal-checker': () => <StringTool mode="palindrome" />,
    'txt-reverse': () => <StringTool mode="reverse" />,
    'b64-img': () => <Base64ImageTool />,
    'url-short': () => <MockTool name="URL Shortener" />,
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
    }));
  }, []);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 dark:text-white transition-colors duration-300">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex flex-col md:flex-row gap-8">
          <div className="hidden lg:block w-72 flex-shrink-0">
            <Sidebar categories={CATEGORIES} activeCategory={activeCategory} setActiveCategory={setActiveCategory} favorites={favorites} tools={fullTools} />
          </div>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<ToolGrid tools={fullTools} searchQuery={searchQuery} activeCategory={activeCategory} favorites={favorites} toggleFavorite={toggleFavorite} />} />
              <Route path="/admin" element={<AdminDashboard tools={fullTools} />} />
              {fullTools.map(tool => (
                <Route key={tool.id} path={`/${tool.slug}`} element={<ToolContainer tool={tool}><tool.component /></ToolContainer>} />
              ))}
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

const StringTool = ({ mode }: { mode: 'palindrome' | 'reverse' }) => {
  const [val, setVal] = useState('');
  const result = mode === 'reverse' ? val.split('').reverse().join('') : (val.toLowerCase().replace(/[^a-z0-9]/g, '') === val.toLowerCase().replace(/[^a-z0-9]/g, '').split('').reverse().join('') && val ? 'It is a Palindrome! ✅' : 'Not a palindrome ❌');
  return (
    <div className="space-y-6">
      <input className="w-full p-4 border rounded-xl dark:bg-slate-800" placeholder="Type here..." value={val} onChange={e => setVal(e.target.value)} />
      <div className="p-10 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-center text-2xl font-bold">{result}</div>
    </div>
  );
};

const Base64ImageTool = () => {
  const [b64, setB64] = useState('');
  return (
    <div className="space-y-6">
      <textarea className="w-full h-32 p-4 border rounded-xl dark:bg-slate-800" placeholder="Paste data:image/png;base64,..." value={b64} onChange={e => setB64(e.target.value)} />
      {b64 && <div className="border p-4 rounded-xl flex justify-center"><img src={b64} className="max-w-full h-auto" alt="Decoded result" /></div>}
    </div>
  );
};

const MockTool = ({ name }: { name: string }) => (
  <div className="p-20 text-center bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed">
    <i className="fa-solid fa-cloud text-6xl text-slate-200 mb-6"></i>
    <h2 className="text-2xl font-bold mb-2">{name}</h2>
    <p className="text-slate-500 max-w-sm mx-auto">This tool requires specialized cloud processing which is currently being provisioned for your project.</p>
  </div>
);

const ToolContainer: React.FC<{ tool: Tool, children: React.ReactNode }> = ({ tool, children }) => {
  useEffect(() => { document.title = tool.seoTitle; window.scrollTo(0, 0); }, [tool]);
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-10 text-white relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <i className={`fa-solid ${tool.icon}`}></i>
        </div>
        <nav className="flex mb-6 text-sm font-medium text-blue-100/70"><Link to="/" className="hover:text-white">Home</Link><span className="mx-2">/</span><span>{tool.name}</span></nav>
        <h1 className="text-4xl font-black mb-2">{tool.name}</h1>
        <p className="text-lg opacity-90">{tool.description}</p>
      </div>
      <div className="p-8 md:p-12">{children}</div>
    </div>
  );
};
