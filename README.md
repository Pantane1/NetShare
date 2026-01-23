# 🌐 NetShare AI

**NetShare AI** is a lightweight, clean, and AI-powered virtual hotspot manager. It provides a modern interface to share your device's internet connection (Wi-Fi, Ethernet, or Mobile Data) while enforcing account-based access control.

---

## ✨ Key Features

- **Virtual Hotspot Control**: Simple Start/Stop interface for OS-level hotspot broadcasting.
- **Hardware Command Bridge**: Generates optimized terminal scripts for Windows (`netsh`) and Linux (`nmcli`) to bypass browser sandboxing.
- **AI Network Assistant**: Integrated Gemini 3 Pro expert for troubleshooting hardware drivers, ICS settings, and signal optimization.
- **Device Monitoring**: Real-time tracking of connected clients, IP addresses, and connection stability.
- **Account-Based Gating**: Secure login requirement to prevent unauthorized hotspot activation.

---

## 🚀 Quick Start

1. **Login**: Access the dashboard using your secure account.
2. **Configure**: Set your Network SSID (Name) and a strong WPA2 Password.
3. **Initialize**: Press **START**. The UI will enter "Broadcast Mode."
4. **Activate Hardware**: 
   - Copy the generated terminal command from the dashboard.
   - Open your **Terminal/Command Prompt as Administrator**.
   - Paste and run the command to enable physical broadcasting.
5. **Connect**: Your hotspot is now visible to other devices!

---

## 🛠️ Built With

- **Frontend**: React 19 + Tailwind CSS
- **Intelligence**: Google Gemini API (Gemini 2.0 Flash)
- **Styling**: Glassmorphism UI Design
- **Architecture**: Web-to-OS Hardware Bridge

---

## ⚠️ Important Note
*NetShare AI requires administrative privileges on the host machine to modify network adapter settings and enable Internet Connection Sharing (ICS).*

---
*Built for professionals who need simple, secure, and smart internet sharing.*