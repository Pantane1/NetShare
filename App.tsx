
import React, { useState, useEffect } from 'react';
import { HotspotStatus, User, HotspotConfig } from './types';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<HotspotStatus>(HotspotStatus.OFF);
  const [config, setConfig] = useState<HotspotConfig>({
    ssid: 'NetShare_Hotspot',
    password: 'password123',
    band: 'Auto'
  });

  // Persist session check (simulated)
  useEffect(() => {
    const savedUser = localStorage.getItem('netshare_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (email: string) => {
    const newUser = { email, name: email.split('@')[0], isLoggedIn: true };
    setUser(newUser);
    localStorage.setItem('netshare_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    if (status === HotspotStatus.ON) {
      // Force stop hotspot on logout
      setStatus(HotspotStatus.OFF);
    }
    setUser(null);
    localStorage.removeItem('netshare_user');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden gradient-bg">
      <Sidebar user={user} onLogout={handleLogout} activeStatus={status} />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <Dashboard 
          status={status} 
          setStatus={setStatus} 
          config={config} 
          setConfig={setConfig} 
        />
      </main>
    </div>
  );
};

export default App;
