
import React, { useState } from 'react';
import { generateAIImage } from '../services/geminiService';

const AIImageTool: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [ratio, setRatio] = useState<"1:1" | "16:9" | "9:16">("1:1");
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const url = await generateAIImage(prompt, ratio);
      setGeneratedImage(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during generation.");
    } finally {
      setIsLoading(false);
    }
  };

  const isKeyMissing = !process.env.API_KEY;

  return (
    <div className="space-y-8">
      {isKeyMissing && (
        <div className="p-6 bg-amber-50 border-2 border-amber-200 rounded-2xl text-amber-800 animate-pulse">
          <div className="flex items-center gap-3 mb-2">
            <i className="fa-solid fa-triangle-exclamation text-xl"></i>
            <h3 className="font-bold">Configuration Required</h3>
          </div>
          <p className="text-sm">
            The <b>API_KEY</b> variable is not set in your Cloudflare environment. 
            AI tools will not work until you add the key in Cloudflare Settings and Redeploy.
          </p>
        </div>
      )}

      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <label className="block font-bold mb-4">Prompt</label>
        <textarea
          className="w-full p-4 border rounded-xl bg-white dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 outline-none h-24 mb-4"
          placeholder="Describe the image you want to create..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isKeyMissing || isLoading}
        />
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {(['1:1', '16:9', '9:16'] as const).map(r => (
              <button
                key={r}
                onClick={() => setRatio(r)}
                className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                  ratio === r ? 'bg-purple-600 text-white border-purple-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
                disabled={isKeyMissing}
              >
                {r}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isLoading || isKeyMissing || !prompt.trim()}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
            {isLoading ? 'Generating...' : 'Generate Image'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-3">
          <i className="fa-solid fa-circle-exclamation mt-1"></i>
          <div>
            <p className="font-bold">Error Details</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {generatedImage && (
        <div className="flex flex-col items-center animate-in zoom-in duration-300">
          <div className="relative group max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <img src={generatedImage} alt="AI Generated" className="w-full h-auto" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <a 
                href={generatedImage} 
                download="ai-image.png"
                className="bg-white text-slate-900 p-4 rounded-full hover:scale-110 transition-transform"
              >
                <i className="fa-solid fa-download text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      )}

      {!generatedImage && !isLoading && !error && (
        <div className="h-64 flex flex-col items-center justify-center text-slate-300">
          <i className="fa-solid fa-image text-6xl mb-4"></i>
          <p>Your creation will appear here</p>
        </div>
      )}
    </div>
  );
};

export default AIImageTool;
