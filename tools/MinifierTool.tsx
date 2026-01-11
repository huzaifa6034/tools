
import React, { useState } from 'react';

interface MinifierProps {
  type: 'html' | 'css' | 'js';
}

const MinifierTool: React.FC<MinifierProps> = ({ type }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const minify = () => {
    let result = input;
    if (type === 'html') {
      result = input.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
    } else if (type === 'css') {
      result = input.replace(/\s+/g, ' ').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*([{};:])\s*/g, '$1').trim();
    } else if (type === 'js') {
      result = input.replace(/\/\/.*/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
    }
    setOutput(result);
  };

  return (
    <div className="space-y-6">
      <textarea
        className="w-full h-64 p-4 border rounded-xl dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        placeholder={`Paste your ${type.toUpperCase()} here...`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={minify} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg">Minify Now</button>
      {output && (
        <div className="relative group">
          <textarea
            readOnly
            className="w-full h-64 p-4 bg-slate-50 dark:bg-slate-900 border rounded-xl font-mono text-sm"
            value={output}
          />
          <button 
            onClick={() => { navigator.clipboard.writeText(output); alert('Copied!'); }}
            className="absolute top-4 right-4 bg-white dark:bg-slate-800 p-2 rounded-lg border shadow-sm"
          >
            <i className="fa-solid fa-copy"></i>
          </button>
          <div className="text-xs text-slate-400 mt-2">
            Reduction: {Math.round((1 - output.length / input.length) * 100)}%
          </div>
        </div>
      )}
    </div>
  );
};

export default MinifierTool;
