
import React, { useState } from 'react';
import { useAuth } from './AuthContext.tsx';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attempts >= 5) {
      setError('Too many attempts. Access locked for 15 minutes.');
      return;
    }

    setIsLoading(true);
    setError('');
    
    const success = await login(username, password);
    if (success) {
      window.location.reload(); // Refresh to trigger route protection update
    } else {
      setAttempts(prev => prev + 1);
      setError(`Invalid credentials. ${5 - (attempts + 1)} attempts remaining.`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-10 md:p-14 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-xl shadow-blue-500/30">
            <i className="fa-solid fa-user-shield"></i>
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Admin Login</h1>
          <p className="text-slate-500 dark:text-slate-400">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Username</label>
            <input
              type="text"
              required
              className="w-full p-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. Huzaifa"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Password</label>
            <input
              type="password"
              required
              className="w-full p-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl flex items-center gap-3">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || attempts >= 5}
            className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 uppercase tracking-widest text-xs"
          >
            {isLoading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : 'Verify Access'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <button className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
