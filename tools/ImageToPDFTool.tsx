
import React, { useState } from 'react';
// @ts-ignore
import { jsPDF } from 'https://esm.sh/jspdf';

const ImageToPDFTool: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => setImages(prev => [...prev, ev.target?.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    images.forEach((img, i) => {
      if (i > 0) doc.addPage();
      doc.addImage(img, 'JPEG', 10, 10, 190, 277);
    });
    doc.save('toolly-converted.pdf');
  };

  return (
    <div className="space-y-8">
      <div className="border-4 border-dashed border-slate-200 p-12 rounded-3xl text-center relative hover:border-blue-400 transition-colors">
        <input type="file" multiple accept="image/*" onChange={handleFiles} className="absolute inset-0 opacity-0 cursor-pointer" />
        <i className="fa-solid fa-images text-5xl text-slate-300 mb-4"></i>
        <h3 className="text-xl font-bold">Upload Images</h3>
        <p className="text-slate-500">Selected: {images.length}</p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden border">
              <img src={img} className="w-full h-24 object-cover" />
              <button onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            </div>
          ))}
        </div>
      )}

      <button onClick={generatePDF} disabled={images.length === 0} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-50">
        Generate PDF
      </button>
    </div>
  );
};

export default ImageToPDFTool;
