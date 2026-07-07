import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();


const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);



export const generateEmbedding = async (text) => {

    try {


        const model =
            genAI.getGenerativeModel({
                model: "gemini-embedding-001"
            });



        const result =
            await model.embedContent(text);



        return result.embedding.values;



    } catch(error) {


        console.log(
            "Embedding Error:",
            error.message
        );


        throw new Error(
            "Failed to generate embedding"
        );

    }

};