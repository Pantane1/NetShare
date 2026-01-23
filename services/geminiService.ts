
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getNetworkAssistance(messages: Message[]): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : m.role,
        parts: [{ text: m.content }]
      })),
      config: {
        systemInstruction: `You are the NetShare Hardware Expert. 
        The user is using a web dashboard but needs to run terminal commands to actually bridge their Wi-Fi hardware.
        If they say "I can't see the hotspot", explain that they MUST run terminal commands as Administrator/Root because browsers are sandboxed.
        Provide specific help for:
        1. 'The hosted network couldn't be started' error (Drivers issue).
        2. Enabling ICS (Internet Connection Sharing) in Control Panel.
        3. Checking if their Wi-Fi card supports 'Hosted network: Yes' via 'netsh wlan show drivers'.
        Keep it highly technical, practical, and troubleshooting-oriented.`,
        temperature: 0.4,
      },
    });

    return response.text || "I'm having trouble analyzing your hardware state. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection Error: Check your own internet access to reach the AI support module.";
  }
}
