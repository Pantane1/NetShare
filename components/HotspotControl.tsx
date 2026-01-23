
import React, { useState } from 'react';
import { HotspotStatus, HotspotConfig } from '../types';
import { HotspotService } from '../services/hotspotService';

interface HotspotControlProps {
  status: HotspotStatus;
  setStatus: (s: HotspotStatus) => void;
  config: HotspotConfig;
  setConfig: (c: HotspotConfig) => void;
}

const HotspotControl: React.FC<HotspotControlProps> = ({ status, setStatus, config, setConfig }) => {
  const [showCommands, setShowCommands] = useState(false);
  const platform = window.navigator.platform;

  const toggleHotspot = async () => {
    if (status === HotspotStatus.OFF || status === HotspotStatus.ERROR) {
      setStatus(HotspotStatus.STARTING);
      const success = await HotspotService.start(config);
      if (success) {
        setStatus(HotspotStatus.ON);
        setShowCommands(true); // Show instructions on how to make it "real"
      } else {
        setStatus(HotspotStatus.ERROR);
      }
    } else if (status === HotspotStatus.ON) {
      setStatus(HotspotStatus.STOPPING);
      await HotspotService.stop();
      setStatus(HotspotStatus.OFF);
      setShowCommands(false);
    }
  };

  const isTransitioning = status === HotspotStatus.STARTING || status === HotspotStatus.STOPPING;
  const sysCommand = HotspotService.getSystemCommands(config, platform);

  return (
    <div className="space-y-4">
      <div className="glass-card rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {status === HotspotStatus.ON && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/5 rounded-full pulse pointer-events-none" />
        )}

        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="flex flex-col items-center">
            <button
              onClick={toggleHotspot}
              disabled={isTransitioning}
              className={`
                w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 transition-all duration-500 border-4
                ${status === HotspotStatus.ON 
                  ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_50px_rgba(79,70,229,0.4)]' 
                  : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                }
                ${isTransitioning ? 'opacity-50 animate-pulse' : 'active:scale-95'}
              `}
            >
              <svg className={`w-16 h-16 ${status === HotspotStatus.ON ? 'text-white' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-bold tracking-widest text-xs">
                {status.toUpperCase()}
              </span>
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400">Network SSID</label>
              <input 
                type="text" 
                value={config.ssid}
                onChange={(e) => setConfig({...config, ssid: e.target.value})}
                disabled={status === HotspotStatus.ON}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400">Password</label>
              <input 
                type="password" 
                value={config.password}
                onChange={(e) => setConfig({...config, password: e.target.value})}
                disabled={status === HotspotStatus.ON}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      </div>

      {showCommands && status === HotspotStatus.ON && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-start gap-4">
            <div className="bg-amber-500 p-2 rounded-lg">
              <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-amber-500 font-bold mb-1">Hardware Activation Required</h4>
              <p className="text-sm text-slate-300 mb-4">
                The UI is ready. To broadcast this network from your physical Wi-Fi card, run this command in your 
                <span className="font-bold text-white"> Terminal (as Administrator)</span>:
              </p>
              <div className="bg-black/40 rounded-lg p-4 font-mono text-xs text-indigo-300 border border-white/5 relative group">
                <code className="block whitespace-pre-wrap">{sysCommand}</code>
                <button 
                  onClick={() => navigator.clipboard.writeText(sysCommand)}
                  className="absolute top-2 right-2 p-1.5 bg-white/5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotspotControl;
