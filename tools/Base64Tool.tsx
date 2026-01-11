
import React, { useState } from 'react';

const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setOutput("Error: Invalid input for " + mode);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button 
          onClick={() => setMode('encode')}
          className={`flex-1 py-3 rounded-xl font-bold border transition-all ${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-white'}`}
        >
          Encode
        </button>
        <button 
          onClick={() => setMode('decode')}
          className={`flex-1 py-3 rounded-xl font-bold border transition-all ${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-white'}`}
        >
          Decode
        </button>
      </div>
      <textarea 
        className="w-full h-40 p-4 border rounded-xl dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder={`Paste text to ${mode}...`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button 
        onClick={process}
        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl"
      >
        Convert Now
      </button>
      {output && (
        <div className="p-4 bg-blue-50 rounded-xl border relative">
          <p className="font-mono text-sm break-all">{output}</p>
          <button 
            onClick={() => { navigator.clipboard.writeText(output); alert("Copied!"); }}
            className="absolute top-2 right-2 text-blue-600"
          >
            <i className="fa-solid fa-copy"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Base64Tool;
