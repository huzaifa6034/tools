
import React, { useState, useEffect } from 'react';

const NotepadTool: React.FC = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('toolly_notepad');
    if (saved) setContent(saved);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);
    localStorage.setItem('toolly_notepad', val);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-slate-400 uppercase">Auto-saved to Browser Storage</span>
        <button onClick={() => { setContent(''); localStorage.removeItem('toolly_notepad'); }} className="text-red-500 text-xs font-bold">Clear All</button>
      </div>
      <textarea
        className="w-full h-[500px] p-10 border rounded-3xl dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500 shadow-xl leading-relaxed font-serif text-lg"
        placeholder="Start writing your thoughts..."
        value={content}
        onChange={handleChange}
      />
    </div>
  );
};

export default NotepadTool;
