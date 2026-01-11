
import React, { useState } from 'react';

const PasswordTool: React.FC = () => {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [password, setPassword] = useState('');

  const generate = () => {
    let charset = '';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    if (!charset) return alert("Select at least one character set!");

    let res = '';
    for (let i = 0; i < length; i++) {
      res += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(res);
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    alert("Copied!");
  };

  // Initial generation
  React.useEffect(() => { generate(); }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="relative">
        <input 
          readOnly 
          value={password}
          className="w-full p-6 text-2xl font-mono text-center bg-slate-50 dark:bg-slate-900 border-2 border-blue-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 transition-colors"
        />
        <button 
          onClick={copy}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-blue-600 hover:bg-blue-50 rounded-xl"
        >
          <i className="fa-solid fa-copy text-xl"></i>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-sm font-bold">Password Length: {length}</label>
          <input 
            type="range" min="4" max="64" value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(options).map(([key, val]) => (
            <label key={key} className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
              <input 
                type="checkbox" checked={val} 
                onChange={() => setOptions(p => ({...p, [key]: !val}))}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-sm font-medium capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>

      <button 
        onClick={generate}
        className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1"
      >
        <i className="fa-solid fa-rotate mr-2"></i> Regenerate
      </button>
    </div>
  );
};

export default PasswordTool;
