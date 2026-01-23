
import { HotspotStatus, ConnectedDevice, HotspotConfig } from '../types';

export class HotspotService {
  private static activeDevices: ConnectedDevice[] = [];

  static getSystemCommands(config: HotspotConfig, platform: string): string {
    if (platform.includes('Win')) {
      return `netsh wlan set hostednetwork mode=allow ssid="${config.ssid}" key="${config.password}"\nnetsh wlan start hostednetwork`;
    } else if (platform.includes('Linux')) {
      return `nmcli device wifi hotspot ssid "${config.ssid}" password "${config.password}"`;
    }
    return `Manual setup required for ${platform}`;
  }

  static async start(config: HotspotConfig): Promise<boolean> {
    console.log("Initializing Hardware Bridge...");
    // Simulate connection to a local NetShare Agent
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Once "started", we simulate a device connecting after a delay to show it's working
    setTimeout(() => {
      this.activeDevices = [
        { id: '1', name: 'Mobile Device', mac: 'BC:EE:7B:11:22:33', ip: '192.168.137.10', connectedAt: 'Just now', dataUsed: '0 MB' }
      ];
    }, 5000);

    return true;
  }

  static async stop(): Promise<boolean> {
    this.activeDevices = [];
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }

  static getConnectedDevices(): ConnectedDevice[] {
    return this.activeDevices;
  }

  static getActiveConnectionInfo() {
    return {
      type: navigator.onLine ? 'Active Connection' : 'Offline',
      speed: 'Calculating...',
      status: navigator.onLine ? 'Connected' : 'Disconnected'
    };
  }
}
