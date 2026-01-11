
import { GoogleGenAI } from "@google/genai";

// Guideline: API key must be obtained exclusively from the environment variable process.env.API_KEY.
// Guideline: Use this process.env.API_KEY string directly when initializing (must use new GoogleGenAI({ apiKey: process.env.API_KEY })).

export const generateAIImage = async (prompt: string, aspectRatio: "1:1" | "16:9" | "9:16" = "1:1") => {
  // Always use the required direct initialization with process.env.API_KEY
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

  // Guideline: The output response may contain both image and text parts; you must iterate through all parts to find the image part.
  for (const part of response.candidates?.[0]?.content.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
};

export const textToSpeechGemini = async (text: string) => {
  // Always use the required direct initialization with process.env.API_KEY
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

  // The audio bytes returned by the API is raw PCM data.
  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("Audio generation failed");
  return base64Audio;
};
