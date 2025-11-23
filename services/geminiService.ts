// Using the provided OpenRouter API Key
const OPENROUTER_API_KEY = "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";
const SITE_URL = "https://verumora.co";
const SITE_NAME = "Verumora";

export const generateProductConcept = async (prompt: string): Promise<string | null> => {
  try {
    // 1. Use OpenRouter (AI) to enhance the simple user prompt into a professional art direction prompt
    // We use google/gemini-2.0-flash-001 which is the efficient Flash model available on OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001", 
        "messages": [
          {
            "role": "system",
            "content": "You are an expert AI Art Director. Your task is to take a simple product description and convert it into a highly detailed, photorealistic image generation prompt. Focus on lighting (volumetric, studio), materials (matte, glossy), camera angles (macro, wide), and high-end aesthetics (8k, unreal engine 5 render, cinematic). Output ONLY the raw prompt text, no introductions, no markdown, no quotes."
          },
          {
            "role": "user",
            "content": `Create a photorealistic image prompt for: ${prompt}. Dark moody aesthetic, minimalist, high contrast.`
          }
        ]
      })
    });

    if (!response.ok) {
        throw new Error(`OpenRouter API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const enhancedPrompt = data.choices?.[0]?.message?.content || prompt;
    
    // 2. Use the enhanced prompt to generate a real image via Pollinations
    // We encode the prompt to ensure it works in the URL. 
    // We add a random seed to ensure a new image is generated every time.
    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${Math.floor(Math.random() * 10000)}`;
    
    return imageUrl;

  } catch (error) {
    console.error("Error generating concept:", error);
    // Fallback: If AI fails, try generating with the raw prompt directly
    const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " dark aesthetic high quality")}?width=1024&height=1024&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;
    return fallbackUrl;
  }
};

export const generateCopywriting = async (topic: string): Promise<string> => {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
              "HTTP-Referer": SITE_URL,
              "X-Title": SITE_NAME,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "model": "google/gemini-2.0-flash-001",
              "messages": [
                {
                  "role": "system",
                  "content": "You are a senior copywriter for Verumora, a brutalist digital agency. Output only the requested slogan."
                },
                {
                  "role": "user",
                  "content": `Write a short, punchy, aggressive marketing slogan (max 10 words) for a brand selling: ${topic}. The tone should be modern, minimal, and confident.`
                }
              ]
            })
          });

        if (!response.ok) {
            return "Copy generation unavailable.";
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "Error generating copy.";

    } catch (error) {
        console.error("Error generating copy:", error);
        return "System overload. Try again.";
    }
}








// import { GoogleGenAI } from "@google/genai";

// // Helper to safely get the API key from various environment configurations
// const getApiKey = (): string | undefined => {
//   let key: string | undefined;

//   // 1. Try Vite specific (import.meta.env) - Standard for Vite/Vercel
//   try {
//     const metaEnv = (import.meta as any).env;
//     if (metaEnv && metaEnv.VITE_API_KEY) {
//       key = metaEnv.VITE_API_KEY;
//     }
//   } catch (e) {
//     // Ignore if import.meta is undefined
//   }

//   // 2. Try process.env (Common in Node or fallback in some build tools)
//   if (!key) {
//     try {
//       if (typeof process !== "undefined" && process.env) {
//         if (process.env.VITE_API_KEY) key = process.env.VITE_API_KEY;
//         else if (process.env.API_KEY) key = process.env.API_KEY;
//       }
//     } catch (e) {
//       // Ignore if process is undefined
//     }
//   }

//   return key ? key.trim() : undefined;
// };

// export const generateProductConcept = async (prompt: string): Promise<string | null> => {
//   try {
//     const apiKey = getApiKey();
    
//     if (!apiKey) {
//         console.error("API Key missing. Please set 'VITE_API_KEY' in your Vercel Project Settings.");
//         throw new Error("API Key Missing");
//     }

//     const ai = new GoogleGenAI({ apiKey });
    
//     // Using 'gemini-2.5-flash-image' (Nano Banana)
//     // This model allows for image generation and is typically available in the free tier
//     // We add explicit imageConfig to ensure the model behaves as expected for image tasks.
//     const response = await ai.models.generateContent({
//       model: 'gemini-2.5-flash-image',
//       contents: {
//         parts: [
//           {
//             text: `Generate a photorealistic product shot of ${prompt}. Professional studio lighting, minimalist background, high contrast, 8k resolution, cinematic look.`,
//           },
//         ],
//       },
//       config: {
//         imageConfig: {
//             aspectRatio: "1:1"
//         }
//       }
//     });

//     // Iterate through parts to find inline image data
//     const parts = response.candidates?.[0]?.content?.parts;
//     if (parts) {
//         for (const part of parts) {
//             if (part.inlineData) {
//                 const base64EncodeString = part.inlineData.data;
//                 return `data:image/png;base64,${base64EncodeString}`;
//             }
//         }
//     }
    
//     console.warn("No image data found in response. Model might have returned text only.", response);
//     return null;
//   } catch (error) {
//     console.error("Error generating image concept:", error);
//     throw error;
//   }
// };

// export const generateCopywriting = async (topic: string): Promise<string> => {
//     try {
//         const apiKey = getApiKey();
//         if (!apiKey) return "Error: API Key Config Missing";

//         const ai = new GoogleGenAI({ apiKey });
        
//         // Using 'gemini-2.5-flash' for text tasks
//         const response = await ai.models.generateContent({
//             model: 'gemini-2.5-flash',
//             contents: `Write a short, punchy, aggressive marketing slogan (max 10 words) for a brand selling: ${topic}. The tone should be modern, minimal, and confident.`,
//         });
//         return response.text || "Error generating copy.";
//     } catch (error) {
//         console.error("Error generating copy:", error);
//         return "Copy generation failed.";
//     }
// }





// import { GoogleGenAI } from "@google/genai";

// // Helper to safely get the API key from various environment configurations
// const getApiKey = (): string | undefined => {
//   let key: string | undefined;

//   // 1. Try Vite specific (import.meta.env) - Standard for Vite/Vercel
//   try {
//     const metaEnv = (import.meta as any).env;
//     if (metaEnv && metaEnv.VITE_API_KEY) {
//       key = metaEnv.VITE_API_KEY;
//     }
//   } catch (e) {
//     // Ignore if import.meta is undefined
//   }

//   // 2. Try process.env (Common in Node or fallback in some build tools)
//   if (!key) {
//     try {
//       if (typeof process !== "undefined" && process.env) {
//         if (process.env.VITE_API_KEY) key = process.env.VITE_API_KEY;
//         else if (process.env.API_KEY) key = process.env.API_KEY;
//       }
//     } catch (e) {
//       // Ignore if process is undefined
//     }
//   }

//   return key ? key.trim() : undefined;
// };

// export const generateProductConcept = async (prompt: string): Promise<string | null> => {
//   try {
//     const apiKey = getApiKey();
    
//     if (!apiKey) {
//         console.error("API Key missing. Please set 'VITE_API_KEY' in your Vercel Project Settings.");
//         throw new Error("API Key Missing");
//     }

//     const ai = new GoogleGenAI({ apiKey });
    
//     // Using 'gemini-2.5-flash-image' (Nano Banana)
//     // This is the most efficient, free-tier friendly model for image generation
//     const response = await ai.models.generateContent({
//       model: 'gemini-2.5-flash-image',
//       contents: {
//         parts: [
//           {
//             text: `Professional studio product photography of ${prompt}, minimalist, high contrast, 8k resolution, dramatic lighting, photorealistic.`,
//           },
//         ],
//       },
//     });

//     // Iterate through parts to find inline image data
//     const parts = response.candidates?.[0]?.content?.parts;
//     if (parts) {
//         for (const part of parts) {
//             if (part.inlineData) {
//                 const base64EncodeString = part.inlineData.data;
//                 return `data:image/png;base64,${base64EncodeString}`;
//             }
//         }
//     }
    
//     return null;
//   } catch (error) {
//     console.error("Error generating image concept:", error);
//     // We throw here so the component can handle the specific image failure
//     throw error;
//   }
// };

// export const generateCopywriting = async (topic: string): Promise<string> => {
//     try {
//         const apiKey = getApiKey();
//         if (!apiKey) return "Error: API Key Config Missing";

//         const ai = new GoogleGenAI({ apiKey });
        
//         // Using 'gemini-2.5-flash' for text tasks
//         const response = await ai.models.generateContent({
//             model: 'gemini-2.5-flash',
//             contents: `Write a short, punchy, aggressive marketing slogan (max 10 words) for a brand selling: ${topic}. The tone should be modern, minimal, and confident.`,
//         });
//         return response.text || "Error generating copy.";
//     } catch (error) {
//         console.error("Error generating copy:", error);
//         return "Copy generation failed.";
//     }
// }
