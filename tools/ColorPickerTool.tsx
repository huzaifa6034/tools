
import React, { useState } from 'react';

const ColorPickerTool: React.FC = () => {
  const [color, setColor] = useState('#3b82f6');

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    alert(`Copied ${val}`);
  };

  return (
    <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div 
          className="w-full h-48 rounded-3xl shadow-inner flex items-center justify-center text-white font-black text-2xl"
          style={{ backgroundColor: color }}
        >
          {color.toUpperCase()}
        </div>
        
        <input 
          type="color" 
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-20 rounded-2xl cursor-pointer border-none p-0 overflow-hidden"
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-bold text-slate-400 uppercase text-xs tracking-widest">Values</h4>
        <div className="space-y-3">
          <ValueCard label="HEX" value={color.toUpperCase()} onCopy={() => copy(color)} />
          <ValueCard label="RGB" value={hexToRgb(color)} onCopy={() => copy(hexToRgb(color))} />
        </div>

        <h4 className="font-bold text-slate-400 uppercase text-xs tracking-widest mt-8">Shades</h4>
        <div className="grid grid-cols-5 gap-2">
          {[0.2, 0.4, 0.6, 0.8, 1].map(o => (
            <div 
              key={o} 
              className="h-10 rounded-lg cursor-pointer hover:scale-105 transition-transform"
              style={{ backgroundColor: color, opacity: o }}
              onClick={() => copy(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ValueCard = ({ label, value, onCopy }: { label: string, value: string, onCopy: () => void }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
    <div>
      <span className="text-xs font-bold text-slate-400 mr-4">{label}</span>
      <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{value}</span>
    </div>
    <button onClick={onCopy} className="text-slate-400 hover:text-blue-600 transition-colors">
      <i className="fa-solid fa-copy"></i>
    </button>
  </div>
);

export default ColorPickerTool;
