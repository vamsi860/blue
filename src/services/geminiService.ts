import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export async function chatWithGemini(messages: Message[]) {
  try {
    // We take the last message as the prompt and previous context as history if needed.
    // For simplicity, we'll use generateContent with the history format.
    
    const contents = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: "You are Bluekite AI, a helpful, intelligent, and friendly AI assistant. Your tone is professional yet approachable. You provide clear, concise, and accurate information. You are designed with a clean and airy 'blue kite' theme in mind - like soaring through a clear blue sky. Use markdown for formatting when appropriate.",
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to communicate with Bluekite AI. Please check your internet connection or API key.");
  }
}

export async function* chatWithGeminiStream(messages: Message[]) {
  try {
    const contents = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: "You are Bluekite AI, a helpful, intelligent, and friendly AI assistant. Your tone is professional yet approachable. Use markdown for formatting when appropriate.",
      }
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to communicate with Bluekite AI.");
  }
}
