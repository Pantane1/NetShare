
import React from 'react';
import { HotspotStatus, HotspotConfig } from '../types';
import HotspotControl from './HotspotControl';
import DeviceList from './DeviceList';
import SmartAssistant from './SmartAssistant';
import NetworkInfo from './NetworkInfo';

interface DashboardProps {
  status: HotspotStatus;
  setStatus: (s: HotspotStatus) => void;
  config: HotspotConfig;
  setConfig: (c: HotspotConfig) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ status, setStatus, config, setConfig }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-3xl font-bold text-white">Network Overview</h2>
          <p className="text-slate-400">Manage your shared connection and secure access.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-white/5">
          <div className={`w-2 h-2 rounded-full ${status === HotspotStatus.ON ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></div>
          <span className="text-sm font-medium text-slate-300">
            {status === HotspotStatus.ON ? 'Hotspot Active' : 'Hotspot Idle'}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Controls & Info */}
        <div className="lg:col-span-2 space-y-6">
          <HotspotControl 
            status={status} 
            setStatus={setStatus} 
            config={config} 
            setConfig={setConfig} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NetworkInfo />
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
               </div>
               <h3 className="text-lg font-bold text-white mb-4">Sharing Mode</h3>
               <div className="space-y-3">
                 <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                   <div className="flex items-center gap-3">
                     <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                     <span className="text-slate-200">Internet Sharing (ICS)</span>
                   </div>
                   <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">AUTO</span>
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-xl bg-slate-700/30 border border-white/5 opacity-50">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5" />
                      <span className="text-slate-300">Traffic Limiter</span>
                    </div>
                    <span className="text-xs text-slate-500">PRO ONLY</span>
                 </div>
               </div>
            </div>
          </div>

          <DeviceList active={status === HotspotStatus.ON} />
        </div>

        {/* Right Column: AI Assistant */}
        <div className="lg:col-span-1">
          <SmartAssistant />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
