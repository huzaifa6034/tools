
import { GoogleGenAI } from "@google/genai";

/**
 * Guideline: API key must be obtained exclusively from the environment variable process.env.API_KEY.
 * Guideline: Use this process.env.API_KEY string directly when initializing.
 */

export const generateAIImage = async (prompt: string, aspectRatio: "1:1" | "16:9" | "9:16" = "1:1") => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is missing. Please add it to your Cloudflare Environment Variables and redeploy.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: { aspectRatio }
      }
    });

    if (!response.candidates?.[0]?.content?.parts) {
      throw new Error("The AI did not return any image results. Try a different prompt.");
    }

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("API responded but no image was found. Your API key might not have permission for Image Generation.");
  } catch (error: any) {
    console.error("Gemini AI Image Generation Error:", error);
    if (error.message?.includes('401') || error.message?.includes('API_KEY_INVALID')) {
      throw new Error("Invalid API Key. Please double-check your Cloudflare settings.");
    }
    if (error.message?.includes('403')) {
      throw new Error("Permission Denied. Make sure your Google Cloud project has the 'Generative Language API' enabled.");
    }
    throw error;
  }
};

export const textToSpeechGemini = async (text: string) => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is missing for Speech generation.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }
          }
        }
      }
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error("No audio data returned from Gemini TTS.");
    }
    return base64Audio;
  } catch (error: any) {
    console.error("Gemini TTS Error:", error);
    throw error;
  }
};
