import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateCreativeContent = async (prompt: string, currentContext: string) => {
  if (!apiKey) {
    console.warn("API Key is missing. Mocking response.");
    return "ACCESS DENIED: API KEY REQUIRED FOR INTELLIGENCE GENERATION.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are the Warden of Creativity for a high-concept portfolio website themed as a 'Prison'. 
      The metaphor is that brands are 'trapped' in mediocrity, and Mahmoud Osama (the user) breaks them out.
      
      Tone: Dark, Cinematic, Authoritative, Industrial, Urgent.
      Keywords to use: Containment, Breakout, Security, Cell Block, Evidence, Surveillance, Liberty, Release.
      
      Context: ${currentContext}
      
      Task: ${prompt}
      
      Keep it punchy, edgy, and consistent with the prison metaphor. Return only the generated text.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "SYSTEM ERROR: GENERATION FAILED.";
  }
};