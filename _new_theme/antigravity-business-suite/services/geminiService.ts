import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateConcepts = async (prompt: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 5 to 8 short, abstract, or related concepts based on the word: "${prompt}". 
      Keep them single words or very short phrases (max 2 words).
      Return strictly a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            concepts: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const json = JSON.parse(response.text || '{"concepts": []}');
    return json.concepts || [];
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if API fails or key is missing
    return [`Error: ${prompt}`, "Try", "Again", "Later", "System"];
  }
};
