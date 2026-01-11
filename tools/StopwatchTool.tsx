
import React, { useState, useEffect } from 'react';

const StopwatchTool: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-10">
      <div className="text-7xl font-black font-mono tracking-tighter text-blue-600">
        {formatTime(time)}
      </div>
      <div className="flex gap-4">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`px-10 py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${isActive ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {isActive ? 'Stop' : 'Start'}
        </button>
        <button 
          onClick={() => { setTime(0); setIsActive(false); }}
          className="px-10 py-4 rounded-2xl font-bold bg-slate-200 text-slate-700 shadow-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopwatchTool;
