import { GoogleGenAI } from "@google/genai";

// Helper function to safely get API key
const getApiKey = () => {
  // In a real environment, this should be strictly checked. 
  // For this generated code, we assume process.env.API_KEY is populated.
  return process.env.API_KEY || '';
};

export const generateProductConcept = async (prompt: string): Promise<string | null> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
        console.error("API Key missing");
        return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using gemini-2.5-flash-image for efficient generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Professional studio product photography of ${prompt}, minimalist, high contrast, 8k resolution, dramatic lighting.`,
          },
        ],
      },
    });

    // Iterate through parts to find inline image data
    if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64EncodeString = part.inlineData.data;
                return `data:image/png;base64,${base64EncodeString}`;
            }
        }
    }
    
    return null;
  } catch (error) {
    console.error("Error generating image concept:", error);
    throw error;
  }
};

export const generateCopywriting = async (topic: string): Promise<string> => {
    try {
        const apiKey = getApiKey();
        if(!apiKey) return "API Key configuration missing.";

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Write a short, punchy, aggressive marketing slogan (max 10 words) for a brand selling: ${topic}. The tone should be modern, minimal, and confident.`,
        });
        return response.text || "Error generating copy.";
    } catch (error) {
        console.error("Error generating copy:", error);
        return "System overload. Try again.";
    }
}
