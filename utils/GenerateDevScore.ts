import { GoogleGenerativeAI } from "@google/generative-ai";

export const GenerateDevScore = async (jsonObject: any) => {
  try {
    // Ensure API key is available
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error("Gemini API Key is missing.");
    }

    // Initialize the Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Ensure jsonObject is valid
    if (!jsonObject || typeof jsonObject !== "object") {
      throw new Error("Invalid JSON object provided.");
    }

    // Prepare the prompt
    const prompt = `
      Analyze the following developer's data:
      ${JSON.stringify(jsonObject)}

      Based on their contributions, projects, activity, and skills, assign a developer score out of 1000 that reflects:
      - Their expertise
      - Depth of knowledge
      - Number of projects
      - Overall quality as a developer

      Only return the numeric score as the output.`;

    // Generate content using the model
    const response = await model.generateContent( prompt );
    const finalScore = response.response.text(); 

    console.log("Generated Developer Score:", parseInt(finalScore.trim()));

    // Return the result
    return parseInt(finalScore.trim());
  } catch (error) {
    console.error("Error Generating Developer Score:", error);
    throw error;
  }
};
