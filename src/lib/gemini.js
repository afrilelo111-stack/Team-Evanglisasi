import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askGemini(message, settings) {
  try {
    const response = await ai.models.generateContent({
      model: settings.model,
      contents: message,
      config: {
        systemInstruction: settings.system_prompt,
        temperature: settings.temperature,
        maxOutputTokens: settings.max_output_tokens,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}