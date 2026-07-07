import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const askGemini = async (context, question) => {
  try {
    const prompt = `
You are an AI document assistant.

Answer ONLY using the information provided in the context.

If the answer is not present in the context, reply:

"I couldn't find this information in the uploaded document."

------------------------
DOCUMENT CONTEXT
------------------------

${context}

------------------------
QUESTION
------------------------

${question}

Answer:
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    return response.text();

  } catch (error) {
    console.log(error);

    throw new Error("Gemini API Error");
  }
};