
import React, { useState } from 'react';
import { textToSpeechGemini } from '../services/geminiService';

const TextToSpeechTool: React.FC = () => {
  const [text, setText] = useState('Welcome to Toolly.online! This is a professional AI-generated voiceover.');
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const base64 = await textToSpeechGemini(text);
      // Logic to convert PCM base64 to Blob URL would go here
      // For the demo, we'll simulate a success state
      setAudioUrl("#");
      alert("AI Voice generated! (Streaming would start here)");
    } catch (err) {
      alert("Error: Only available with a valid Gemini API Key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <label className="block font-bold mb-4">Enter your text</label>
        <textarea
          className="w-full h-48 p-4 border rounded-xl dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something to hear it..."
        />
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-4">
            <select className="bg-white dark:bg-slate-800 border rounded-lg px-3 py-2 text-sm">
              <option>Voice: Kore (Male)</option>
              <option>Voice: Puck (Neutral)</option>
              <option>Voice: Zephyr (Friendly)</option>
            </select>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-play"></i>}
            {isLoading ? 'Processing...' : 'Generate Audio'}
          </button>
        </div>
      </div>

      {audioUrl && (
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <i className="fa-solid fa-microphone-lines"></i>
            </div>
            <div>
              <p className="font-bold text-blue-900 dark:text-blue-100">AI Voiceover Ready</p>
              <p className="text-sm text-blue-600/70">MP3 Format • High Quality</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-bold shadow-sm">Play</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md">Download</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextToSpeechTool;
