
import React, { useState } from 'react';

const MarkdownTool: React.FC = () => {
  const [markdown, setMarkdown] = useState('# Welcome to Toolly Editor\n\n## Features\n- Live Preview\n- Clean Interface\n- **Bold** and *Italic* support\n\n```js\nconsole.log("Hello Toolly!");\n```');

  return (
    <div className="grid md:grid-cols-2 gap-0 border rounded-2xl overflow-hidden min-h-[500px]">
      <div className="p-4 bg-slate-50 dark:bg-slate-900 border-r flex flex-col">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
          <span>Editor</span>
          <i className="fa-brands fa-markdown text-lg"></i>
        </div>
        <textarea
          className="flex-1 w-full p-4 bg-transparent outline-none font-mono text-sm resize-none leading-relaxed"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </div>
      
      <div className="p-4 bg-white dark:bg-slate-800 flex flex-col overflow-auto">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Preview</div>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {/* Simple manual rendering for the demo */}
          {markdown.split('\n').map((line, i) => {
            if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mb-4">{line.slice(2)}</h1>;
            if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mb-3">{line.slice(3)}</h2>;
            if (line.startsWith('- ')) return <li key={i} className="ml-4">{line.slice(2)}</li>;
            if (line.startsWith('```')) return <pre key={i} className="bg-slate-100 p-3 rounded my-2 font-mono text-xs">{line}</pre>;
            return <p key={i} className="mb-2">{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MarkdownTool;
