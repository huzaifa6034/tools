
import React, { useState, useEffect } from 'react';

const SpeechToTextTool: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.onresult = (event: any) => {
        let current = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          current += event.results[i][0].transcript;
        }
        setTranscript(current);
      };
      rec.onend = () => setIsListening(false);
      setRecognition(rec);
    }
  }, []);

  const toggleListen = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      setTranscript('');
      recognition?.start();
      setIsListening(true);
    }
  };

  return (
    <div className="space-y-6">
      {!recognition && <div className="p-4 bg-red-50 text-red-600 rounded-xl">Your browser does not support Speech Recognition.</div>}
      <div className="p-8 bg-slate-50 dark:bg-slate-900 border rounded-2xl min-h-[300px] relative">
        <p className="whitespace-pre-wrap">{transcript || "Your transcription will appear here..."}</p>
        {isListening && <div className="absolute top-4 right-4 flex gap-1"><div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div></div>}
      </div>
      <div className="flex gap-4">
        <button 
          onClick={toggleListen}
          className={`flex-1 py-4 rounded-xl font-bold text-white shadow-lg ${isListening ? 'bg-red-500' : 'bg-blue-600'}`}
        >
          {isListening ? 'Stop Listening' : 'Start Recording'}
        </button>
        <button 
          onClick={() => { navigator.clipboard.writeText(transcript); alert('Copied!'); }}
          className="px-6 py-4 border rounded-xl font-bold"
        >
          Copy Text
        </button>
      </div>
    </div>
  );
};

export default SpeechToTextTool;
