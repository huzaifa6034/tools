
import React, { useState } from 'react';

const ImageCompressorTool: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressed, setCompressed] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setCompressed(null);
    }
  };

  const compressImage = () => {
    if (!selectedImage) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        setCompressed(dataUrl);
      };
    };
  };

  return (
    <div className="space-y-8">
      {!selectedImage ? (
        <div className="border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-12 text-center hover:border-blue-400 transition-colors group cursor-pointer relative">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <i className="fa-solid fa-cloud-arrow-up text-6xl text-slate-300 group-hover:text-blue-500 mb-4"></i>
          <h3 className="text-xl font-bold mb-2">Drop your image here</h3>
          <p className="text-slate-500">Supports PNG, JPG, WebP</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold">Original Preview</h4>
            <div className="rounded-xl overflow-hidden border">
              <img src={preview!} alt="Original" className="w-full h-64 object-contain bg-slate-100" />
            </div>
            <div className="flex justify-between items-center text-sm font-medium">
              <span>Size: {(selectedImage.size / 1024).toFixed(2)} KB</span>
              <button onClick={() => setSelectedImage(null)} className="text-red-500 hover:underline">Change Image</button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-4">Compression Quality: {Math.round(quality * 100)}%</label>
              <input 
                type="range" min="0.1" max="1" step="0.1" value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600 appearance-none cursor-pointer"
              />
            </div>
            
            <button 
              onClick={compressImage}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg"
            >
              Compress Now
            </button>

            {compressed && (
              <div className="mt-6 p-6 bg-green-50 rounded-2xl border border-green-100 text-center animate-bounce-in">
                <i className="fa-solid fa-circle-check text-green-500 text-3xl mb-2"></i>
                <h5 className="font-bold text-green-800">Success! Optimization Complete</h5>
                <p className="text-sm text-green-600 mb-4">New Size: ~{(selectedImage.size * quality / 1024).toFixed(2)} KB</p>
                <a 
                  href={compressed} 
                  download={`compressed-${selectedImage.name}`}
                  className="inline-block px-8 py-3 bg-green-600 text-white font-bold rounded-lg"
                >
                  Download Optimized Image
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCompressorTool;
