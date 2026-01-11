
import React, { useState, useRef } from 'react';
import { textToSpeechGemini, decodeBase64, decodeAudioData } from '../services/geminiService';

const TextToSpeechTool: React.FC = () => {
  const [text, setText] = useState('Welcome to Toolly.online! This is your high-quality AI generated voice.');
  const [isLoading, setIsLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const base64 = await textToSpeechGemini(text);
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      const audioBytes = decodeBase64(base64);
      const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.start();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <textarea
        className="w-full h-48 p-6 border rounded-2xl dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none shadow-inner"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
      >
        {isLoading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : <i className="fa-solid fa-play mr-2"></i>}
        Listen Now
      </button>
    </div>
  );
};

export default TextToSpeechTool;
