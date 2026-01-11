
import React, { useState } from 'react';
import { Tool } from '../types.ts';

interface ToolEditorProps {
  tool: Tool;
  onSave: (tool: Tool) => void;
  onCancel: () => void;
}

const ToolEditor: React.FC<ToolEditorProps> = ({ tool, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Tool>({ ...tool });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 animate-in slide-in-from-right-8 duration-500">
      <div className="bg-blue-600 p-10 md:p-14 text-white relative">
        <h2 className="text-3xl font-black mb-2 tracking-tight">Configure Tool</h2>
        <p className="text-blue-100 text-lg">Editing metadata for <b>{tool.name}</b></p>
        <button 
          onClick={onCancel}
          className="absolute top-10 right-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="p-10 md:p-14 space-y-12">
        <section className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 border-b pb-4">Core Identification</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Display Name</label>
              <input 
                name="name" value={formData.name} onChange={handleChange}
                className="w-full p-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">URL Slug</label>
              <input 
                name="slug" value={formData.slug} onChange={handleChange}
                className="w-full p-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none font-mono text-xs"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 border-b pb-4">SEO & Search Performance</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Meta Title</label>
              <input 
                name="seoTitle" value={formData.seoTitle} onChange={handleChange}
                className="w-full p-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none"
                placeholder="Target keyword focused title..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Meta Description</label>
              <textarea 
                name="seoDescription" value={formData.seoDescription} onChange={handleChange}
                className="w-full p-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none h-32"
                placeholder="High-converting search snippet..."
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 border-b pb-4">Advanced Configuration</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Category</label>
              <select 
                name="category" value={formData.category} onChange={handleChange}
                className="w-full p-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none"
              >
                <option value="AI">AI Engine</option>
                <option value="Media">Media Processing</option>
                <option value="Developer">Dev Utilities</option>
                <option value="Utility">General Utility</option>
                <option value="Text">Text Tools</option>
                <option value="Social">Social Media</option>
              </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Access Level</label>
               <div className="flex gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={!formData.isPremium} onChange={() => setFormData(p => ({...p, isPremium: false}))} className="accent-blue-600" />
                    <span className="text-xs font-bold uppercase">Free</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={formData.isPremium} onChange={() => setFormData(p => ({...p, isPremium: true}))} className="accent-amber-500" />
                    <span className="text-xs font-bold uppercase">Pro</span>
                  </label>
               </div>
            </div>
            <div className="flex items-end">
               <button 
                onClick={() => onSave(formData)}
                className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 active:scale-95 transition-all uppercase tracking-widest text-xs"
               >
                 <i className="fa-solid fa-floppy-disk mr-2"></i> Save Changes
               </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ToolEditor;
