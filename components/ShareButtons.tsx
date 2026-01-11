
import React from 'react';

interface ShareProps {
  url: string;
  title: string;
}

const ShareButtons: React.FC<ShareProps> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    { name: 'Twitter', icon: 'fa-x-twitter', href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { name: 'Facebook', icon: 'fa-facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'WhatsApp', icon: 'fa-whatsapp', href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
  ];

  return (
    <div className="flex gap-2 items-center mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
      <span className="text-xs font-bold text-slate-400 uppercase mr-2">Share result:</span>
      {platforms.map(p => (
        <a 
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all duration-300"
          title={`Share on ${p.name}`}
        >
          <i className={`fa-brands ${p.icon} text-xs`}></i>
        </a>
      ))}
      <button 
        onClick={() => {
          navigator.clipboard.writeText(url);
          alert('Link copied!');
        }}
        className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all duration-300"
      >
        <i className="fa-solid fa-link text-xs"></i>
      </button>
    </div>
  );
};

export default ShareButtons;
