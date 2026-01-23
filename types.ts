
export enum HotspotStatus {
  OFF = 'OFF',
  STARTING = 'STARTING',
  ON = 'ON',
  STOPPING = 'STOPPING',
  ERROR = 'ERROR'
}

export interface User {
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export interface ConnectedDevice {
  id: string;
  name: string;
  mac: string;
  ip: string;
  connectedAt: string;
  dataUsed: string;
}

export interface HotspotConfig {
  ssid: string;
  password: string;
  band: '2.4GHz' | '5GHz' | 'Auto';
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
