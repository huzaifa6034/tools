
import React, { useState } from 'react';
import { generateAIImage } from '../services/geminiService';

const AIImageTool: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [ratio, setRatio] = useState<"1:1" | "16:9" | "9:16">("1:1");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    try {
      const url = await generateAIImage(prompt, ratio);
      setGeneratedImage(url);
    } catch (err) {
      alert("Error generating image. Please check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <label className="block font-bold mb-4">Prompt</label>
        <textarea
          className="w-full p-4 border rounded-xl bg-white dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 outline-none h-24 mb-4"
          placeholder="A futuristic city with flying cars and neon lights, hyperrealistic, 8k..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
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
              >
                {r}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
            {isLoading ? 'Generating...' : 'Generate Image'}
          </button>
        </div>
      </div>

      {generatedImage && (
        <div className="flex flex-col items-center">
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
          <p className="mt-4 text-slate-500 text-sm">Image generated using Google Gemini 2.5 Flash</p>
        </div>
      )}

      {!generatedImage && !isLoading && (
        <div className="h-64 flex flex-col items-center justify-center text-slate-300">
          <i className="fa-solid fa-image text-6xl mb-4"></i>
          <p>Your creation will appear here</p>
        </div>
      )}
    </div>
  );
};

export default AIImageTool;
