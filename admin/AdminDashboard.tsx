
import React, { useState } from 'react';
import { Tool } from '../types';

interface AdminDashboardProps {
  tools: Tool[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ tools }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'manage' | 'analytics'>('overview');

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
      <div className="bg-slate-900 p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Control Center</h1>
        <p className="text-slate-400">Manage Toolly.online content and view performance metrics.</p>
      </div>

      <div className="flex border-b border-slate-200 dark:border-slate-700">
        {(['overview', 'manage', 'analytics'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === tab 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon="fa-chart-line" label="Total Impressions" value="48,291" color="blue" />
            <StatCard icon="fa-bolt" label="Active Tools" value={tools.length.toString()} color="green" />
            <StatCard icon="fa-users" label="Users (Today)" value="1,204" color="purple" />
            
            <div className="md:col-span-3 mt-8">
              <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <i className="fa-solid fa-plus text-xs"></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold">New tool published: Markdown Editor</p>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'manage' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Tool Management</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">+ Add New Tool</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-bold">Tool Name</th>
                    <th className="px-4 py-3 font-bold">Category</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                    <th className="px-4 py-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {tools.map(tool => (
                    <tr key={tool.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                      <td className="px-4 py-4 font-medium">{tool.name}</td>
                      <td className="px-4 py-4">{tool.category}</td>
                      <td className="px-4 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold">Active</span></td>
                      <td className="px-4 py-4 text-right">
                        <button className="text-blue-600 hover:underline mr-4">Edit</button>
                        <button className="text-red-600 hover:underline">Disable</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: string, label: string, value: string, color: string }> = ({ icon, label, value, color }) => (
  <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
    <div className={`text-${color}-600 mb-2`}>
      <i className={`fa-solid ${icon} text-2xl`}></i>
    </div>
    <div className="text-2xl font-black mb-1">{value}</div>
    <div className="text-sm text-slate-500 font-medium">{label}</div>
  </div>
);

export default AdminDashboard;
