
import React, { useState } from 'react';

const WordCounterTool: React.FC = () => {
  const [text, setText] = useState('');

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    chars: text.length,
    charsNoSpace: text.replace(/\s/g, '').length,
    sentences: text.split(/[.!?]+/).filter(Boolean).length,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200)
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatItem label="Words" value={stats.words} />
        <StatItem label="Characters" value={stats.chars} />
        <StatItem label="Sentences" value={stats.sentences} />
        <StatItem label="Read Time" value={`${stats.readingTime}m`} />
        <StatItem label="No Spaces" value={stats.charsNoSpace} />
      </div>

      <textarea
        className="w-full h-96 p-8 border rounded-2xl dark:bg-slate-900 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
        placeholder="Start typing or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex justify-end gap-4">
        <button onClick={() => setText('')} className="px-6 py-2 text-slate-500 hover:text-slate-800 font-bold">Clear All</button>
        <button onClick={() => {
          navigator.clipboard.writeText(text);
          alert("Copied!");
        }} className="px-6 py-2 bg-slate-100 rounded-xl font-bold hover:bg-slate-200 transition-colors">Copy Text</button>
      </div>
    </div>
  );
};

const StatItem = ({ label, value }: { label: string, value: string | number }) => (
  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-700">
    <div className="text-2xl font-black text-blue-600">{value}</div>
    <div className="text-xs font-bold text-slate-400 uppercase mt-1">{label}</div>
  </div>
);

export default WordCounterTool;
