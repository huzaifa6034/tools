
import React, { useState, useEffect } from 'react';
import { Tool } from '../types.ts';
import { useAuth } from './AuthContext.tsx';
import ToolEditor from './ToolEditor.tsx';

interface AdminDashboardProps {
  tools: Tool[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ tools: initialTools }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'manage' | 'analytics'>('overview');
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from Cloudflare KV
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Fixed status property access by adding it to Tool interface and removing redundant casts
  const toggleToolStatus = (id: string) => {
    if (confirm('Are you sure you want to change this tool\'s status?')) {
       setTools(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'inactive' ? 'active' : 'inactive' } : t));
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-[2.5rem]"></div>
        <div className="grid grid-cols-3 gap-6">
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (editingTool) {
    return (
      <ToolEditor 
        tool={editingTool} 
        onSave={(updated) => {
          setTools(prev => prev.map(t => t.id === updated.id ? updated : t));
          setEditingTool(null);
        }} 
        onCancel={() => setEditingTool(null)} 
      />
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-all duration-500">
      <div className="bg-slate-950 p-10 md:p-14 text-white relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="px-4 py-1.5 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                Admin Mode
              </div>
              <span className="text-slate-400 font-bold text-sm">Welcome back, <span className="text-white">{user}</span></span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Control Center</h1>
            <p className="text-slate-400 text-lg">Manage 30+ tools, SEO metrics, and global analytics.</p>
          </div>
          <button 
            onClick={logout}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
          >
            Logout Session
          </button>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <i className="fa-solid fa-gauge-high"></i>
        </div>
      </div>

      <div className="flex border-b border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-hide">
        {(['overview', 'manage', 'analytics'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-10 py-6 text-xs font-black uppercase tracking-widest transition-all border-b-4 min-w-[150px] ${
              activeTab === tab 
              ? 'border-blue-600 text-blue-600 bg-blue-50/30 dark:bg-blue-900/10' 
              : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-10 md:p-14">
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard icon="fa-chart-pie" label="Total Impressions" value="124,802" trend="+12%" color="blue" />
              <StatCard icon="fa-bolt" label="Active Tools" value={tools.filter(t => t.status !== 'inactive').length.toString()} trend="Stable" color="green" />
              <StatCard icon="fa-users" label="Live Users" value="842" trend="+5%" color="purple" />
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-950/50 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
              <h3 className="text-2xl font-black mb-8 tracking-tight">Recent System Logs</h3>
              <div className="space-y-4">
                <LogItem action="SEO Update" tool="AI Image Generator" time="14 mins ago" user="Huzaifa" />
                <LogItem action="Tool Disabled" tool="Palindrome Checker" time="2 hours ago" user="System" />
                <LogItem action="Security Patch" tool="Global" time="Yesterday" user="Cloudflare" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'manage' && (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
              <div>
                <h3 className="text-2xl font-black tracking-tight">Tool Inventory</h3>
                <p className="text-slate-500 text-sm">Configure SEO and visibility for independent tools.</p>
              </div>
              <button className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-900/20">
                + Add Custom Tool
              </button>
            </div>
            
            <div className="overflow-x-auto rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-8 py-6 font-black uppercase tracking-widest text-[10px] text-slate-400">Tool Detail</th>
                    <th className="px-8 py-6 font-black uppercase tracking-widest text-[10px] text-slate-400">Category</th>
                    <th className="px-8 py-6 font-black uppercase tracking-widest text-[10px] text-slate-400">Status</th>
                    <th className="px-8 py-6 font-black uppercase tracking-widest text-[10px] text-slate-400 text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {tools.map(tool => (
                    <tr key={tool.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/30 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                            <i className={`fa-solid ${tool.icon}`}></i>
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 dark:text-slate-100">{tool.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">/{tool.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-widest">
                          {tool.category}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <button 
                          onClick={() => toggleToolStatus(tool.id)}
                          className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${ tool.status === 'inactive' ? 'text-slate-400' : 'text-green-500'}`}
                        >
                          <div className={`w-2 h-2 rounded-full ${tool.status === 'inactive' ? 'bg-slate-300' : 'bg-green-500 animate-pulse'}`}></div>
                          {tool.status === 'inactive' ? 'Disabled' : 'Live'}
                        </button>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => setEditingTool(tool)}
                            className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                            title="Edit Settings"
                          >
                            <i className="fa-solid fa-pen-to-square text-xs"></i>
                          </button>
                          <button 
                            className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                            title="Delete Permanently"
                          >
                            <i className="fa-solid fa-trash text-xs"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-12 animate-in fade-in duration-700">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem]">
                   <h4 className="text-xl font-black mb-8">Traffic Sources (7 Days)</h4>
                   <div className="flex items-end justify-between h-48 gap-4 px-2">
                      {[65, 45, 80, 55, 95, 70, 85].map((h, i) => (
                        <div key={i} className="flex-1 group relative">
                           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              {h}k
                           </div>
                           <div 
                              className="bg-blue-600/20 group-hover:bg-blue-600 rounded-t-xl transition-all duration-700 w-full" 
                              style={{ height: `${h}%` }}
                           ></div>
                           <div className="text-[10px] font-black text-slate-400 mt-4 text-center">Day {i+1}</div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem]">
                   <h4 className="text-xl font-black mb-8">Device Breakdown</h4>
                   <div className="space-y-6">
                      <ProgressItem label="Mobile Users" percent={74} color="blue" />
                      <ProgressItem label="Desktop View" percent={22} color="purple" />
                      <ProgressItem label="Tablet / Other" percent={4} color="slate" />
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: string, label: string, value: string, trend: string, color: string }> = ({ icon, label, value, trend, color }) => (
  <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all group">
    <div className={`w-14 h-14 rounded-2xl bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div className="flex items-end justify-between">
      <div>
        <div className="text-3xl font-black mb-1">{value}</div>
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</div>
      </div>
      <div className={`text-[10px] font-black uppercase tracking-widest ${trend.includes('+') ? 'text-green-500' : 'text-slate-400'}`}>
        {trend}
      </div>
    </div>
  </div>
);

const LogItem = ({ action, tool, time, user }: any) => (
  <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-colors">
    <div className="flex items-center gap-5">
      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
        <i className="fa-solid fa-history text-xs"></i>
      </div>
      <div>
        <p className="text-sm font-black tracking-tight">{action}: <span className="text-blue-600">{tool}</span></p>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Performed by {user}</p>
      </div>
    </div>
    <div className="text-xs font-bold text-slate-400">{time}</div>
  </div>
);

const ProgressItem = ({ label, percent, color }: any) => (
  <div className="space-y-3">
    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-800 dark:text-white">{percent}%</span>
    </div>
    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <div 
        className={`h-full bg-${color}-600 rounded-full transition-all duration-1000`} 
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  </div>
);

export default AdminDashboard;
