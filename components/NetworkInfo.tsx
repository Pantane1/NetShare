
import React from 'react';
import { HotspotService } from '../services/hotspotService';

const NetworkInfo: React.FC = () => {
  const info = HotspotService.getActiveConnectionInfo();

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-600/5 rounded-full blur-2xl group-hover:bg-indigo-600/10 transition-colors" />
      
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Active Source
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Connection Type</span>
          <span className="text-sm font-semibold text-white px-2 py-0.5 bg-slate-800 rounded-md">
            {info.type}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Link Speed</span>
          <span className="text-sm font-semibold text-white">
            {info.speed}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Stability</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`w-3 h-1 rounded-full ${i <= 4 ? 'bg-green-500' : 'bg-slate-700'}`} />
            ))}
          </div>
        </div>
        <div className="pt-2">
          <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-1">
            <span>Data Load</span>
            <span>12%</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[12%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkInfo;
