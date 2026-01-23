
import React, { useState, useEffect } from 'react';
import { ConnectedDevice } from '../types';
import { HotspotService } from '../services/hotspotService';

interface DeviceListProps {
  active: boolean;
}

const DeviceList: React.FC<DeviceListProps> = ({ active }) => {
  const [devices, setDevices] = useState<ConnectedDevice[]>([]);

  useEffect(() => {
    let interval: any;
    if (active) {
      // Poll every 3 seconds to check for "real" connections
      interval = setInterval(() => {
        setDevices([...HotspotService.getConnectedDevices()]);
      }, 3000);
    } else {
      setDevices([]);
    }
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-white">Network Clients</h3>
          {active && devices.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
              {devices.length} Detected
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto min-h-[200px] flex flex-col justify-center">
        {active && devices.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-slate-800/30 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Identity</th>
                <th className="px-6 py-4 font-medium">Local IP</th>
                <th className="px-6 py-4 font-medium">Activity</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{device.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{device.mac}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300 font-mono">{device.ip}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[10%] animate-pulse" />
                      </div>
                      <span className="text-xs text-slate-400">Stable</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-bold text-red-400/50 hover:text-red-400 uppercase tracking-widest">Kick</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
               <svg className={`w-8 h-8 ${active ? 'text-indigo-500 animate-spin' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <p className="text-slate-400 text-sm font-medium">
              {active ? 'Hardware broadcasting... waiting for client handshake.' : 'Start the hotspot service to monitor connections.'}
            </p>
            {active && (
              <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-tighter">Scanning Virtual ARP Table...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceList;
