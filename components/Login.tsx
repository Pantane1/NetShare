
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password.length >= 6) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-indigo-600 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-purple-600 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card rounded-[2rem] p-10 shadow-2xl border border-white/10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">NetShare AI</h1>
            <p className="text-slate-400 mt-2 text-center">Secure virtual hotspot for professionals.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Work Email</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                placeholder="name@company.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Password</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98]"
            >
              {isNewUser ? 'Create Secure Account' : 'Secure Login'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsNewUser(!isNewUser)}
              className="text-sm text-slate-500 hover:text-indigo-400 transition-colors"
            >
              {isNewUser ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
            </button>
          </div>

          <div className="mt-10 pt-6 border-t border-white/5 text-[10px] text-slate-600 text-center uppercase tracking-widest font-bold">
            OS Native Integration • No Ads • Fully Private
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
