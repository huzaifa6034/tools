
import React, { useState } from 'react';

const EMOJI_MAP: Record<string, string> = {
  happy: '😊', sad: '😢', love: '❤️', fire: '🔥', cool: '😎', star: '⭐',
  rocket: '🚀', cat: '🐱', dog: '🐶', beer: '🍺', pizza: '🍕', sun: '☀️'
};

const EmojiConverterTool: React.FC = () => {
  const [input, setInput] = useState('');
  
  const converted = input.split(' ').map(word => {
    const clean = word.toLowerCase().replace(/[^\w]/g, '');
    return EMOJI_MAP[clean] || word;
  }).join(' ');

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">Type words like "happy", "fire", or "rocket" to see them convert!</p>
      <textarea
        className="w-full h-32 p-4 border rounded-xl dark:bg-slate-900"
        placeholder="Type here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="p-6 bg-slate-50 dark:bg-slate-900 border rounded-xl min-h-[100px] text-2xl">
        {converted}
      </div>
      <button onClick={() => { navigator.clipboard.writeText(converted); alert('Copied!'); }} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl">Copy Emojis</button>
    </div>
  );
};

export default EmojiConverterTool;
