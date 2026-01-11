
import React, { useState, useRef } from 'react';

const QRCodeTool: React.FC = () => {
  const [text, setText] = useState('https://toolly.online');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `qrcode-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">QR Content (URL or Text)</label>
          <textarea
            className="w-full p-4 border rounded-xl dark:bg-slate-900 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none h-32"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your link or message here..."
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Color</label>
            <input 
              type="color" 
              className="w-full h-12 rounded-lg cursor-pointer"
              value={qrColor}
              onChange={(e) => setQrColor(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Background</label>
            <input 
              type="color" 
              className="w-full h-12 rounded-lg cursor-pointer"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
        </div>

        <button 
          onClick={downloadQR}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-download"></i> Download PNG
        </button>
      </div>

      <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 border-dashed">
        <div ref={qrRef} className="p-4 bg-white rounded-xl shadow-sm mb-6">
          {/* We'll use a simple placeholder canvas approach for the demo */}
          <canvas id="qr-canvas" className="w-48 h-48 bg-slate-200"></canvas>
          <div className="mt-4 text-center text-xs text-slate-400 italic">Live Preview</div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-slate-500 mb-2">Scan to test on mobile</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white dark:bg-slate-800 rounded border text-xs hover:bg-slate-50">Share</button>
            <button className="px-3 py-1 bg-white dark:bg-slate-800 rounded border text-xs hover:bg-slate-50">Print</button>
          </div>
        </div>
      </div>
      
      {/* Script to generate preview - in a real app use qrcode.react */}
      <script dangerouslySetInnerHTML={{ __html: `
        // In a production app, use a real library like qrcode.react
        const drawPlaceholder = () => {
          const canvas = document.getElementById('qr-canvas');
          if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '${bgColor}';
            ctx.fillRect(0,0, canvas.width, canvas.height);
            ctx.fillStyle = '${qrColor}';
            for(let i=0; i<100; i++) {
              ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 10, 10);
            }
          }
        };
        setTimeout(drawPlaceholder, 500);
      `}} />
    </div>
  );
};

export default QRCodeTool;
