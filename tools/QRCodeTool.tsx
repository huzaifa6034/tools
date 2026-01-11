
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore
import QRCode from 'https://esm.sh/qrcode';

const QRCodeTool: React.FC = () => {
  const [text, setText] = useState('https://toolly.online');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, text, {
        width: 300,
        margin: 2,
        color: {
          dark: qrColor,
          light: bgColor,
        },
      }, (error: any) => {
        if (error) console.error('QR Generation error:', error);
      });
    }
  }, [text, qrColor, bgColor]);

  const downloadQR = () => {
    const canvas = canvasRef.current;
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
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Foreground Color</label>
            <input 
              type="color" 
              className="w-full h-12 rounded-lg cursor-pointer border p-1"
              value={qrColor}
              onChange={(e) => setQrColor(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Background Color</label>
            <input 
              type="color" 
              className="w-full h-12 rounded-lg cursor-pointer border p-1"
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
        <div className="p-4 bg-white rounded-xl shadow-sm mb-6 flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-auto max-w-[250px] aspect-square bg-white"></canvas>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-slate-500 mb-2">Scan to test on mobile</p>
          <div className="flex gap-2 justify-center">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(text);
                alert("Link copied!");
              }}
              className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeTool;
