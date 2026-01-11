
import React, { useState } from 'react';

const JSONTool: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatJSON = (indent: number = 2) => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, indent));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonInput);
    alert("Copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => formatJSON(2)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700">Beautify (2 Spaces)</button>
        <button onClick={() => formatJSON(4)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700">Beautify (4 Spaces)</button>
        <button onClick={minifyJSON} className="px-4 py-2 bg-slate-600 text-white rounded-lg text-sm font-bold hover:bg-slate-700">Minify</button>
        <div className="flex-1"></div>
        <button onClick={copyToClipboard} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50"><i className="fa-solid fa-copy mr-2"></i>Copy</button>
      </div>

      <div className="relative">
        <textarea
          className={`w-full h-[400px] p-6 font-mono text-sm border rounded-2xl outline-none focus:ring-2 transition-all dark:bg-slate-900 ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
          }`}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"key": "value", "array": [1, 2, 3]}'
        />
        {error && (
          <div className="mt-2 text-red-500 text-sm flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation"></i> Invalid JSON: {error}
          </div>
        )}
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl text-xs text-slate-500">
        <h4 className="font-bold mb-2 uppercase tracking-wide">Quick Tips:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Always wrap keys in double quotes.</li>
          <li>Ensure trailing commas are removed.</li>
          <li>Paste messy JSON to instantly clean it up.</li>
        </ul>
      </div>
    </div>
  );
};

export default JSONTool;
