
import React, { useState } from 'react';

const LoremIpsumTool: React.FC = () => {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [generatedText, setGeneratedText] = useState('');

  const generate = () => {
    const base = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    
    let result = '';
    if (type === 'paragraphs') {
      result = Array(count).fill(base).join('\n\n');
    } else if (type === 'sentences') {
      const sentences = base.split('. ');
      result = Array(count).fill(0).map((_, i) => sentences[i % sentences.length]).join('. ') + '.';
    } else {
      const words = base.split(' ');
      result = Array(count).fill(0).map((_, i) => words[i % words.length]).join(' ');
    }
    setGeneratedText(result);
  };

  React.useEffect(() => { generate(); }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-6 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-bold mb-2">Count</label>
          <input 
            type="number" min="1" max="100" value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-bold mb-2">Unit</label>
          <select 
            value={type} onChange={(e) => setType(e.target.value as any)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <button 
          onClick={generate}
          className="bg-blue-600 text-white font-bold py-2 px-8 rounded-lg mt-6 shadow-md hover:bg-blue-700"
        >
          Generate
        </button>
      </div>

      <div className="relative">
        <textarea
          readOnly
          value={generatedText}
          className="w-full h-80 p-8 border rounded-2xl outline-none bg-white dark:bg-slate-900 leading-relaxed font-serif"
        />
        <button 
          onClick={() => { navigator.clipboard.writeText(generatedText); alert("Copied!"); }}
          className="absolute right-4 top-4 bg-white/80 backdrop-blur-sm border px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-white"
        >
          <i className="fa-solid fa-copy mr-2"></i> Copy
        </button>
      </div>
    </div>
  );
};

export default LoremIpsumTool;
