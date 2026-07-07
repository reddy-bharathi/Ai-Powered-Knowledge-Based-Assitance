import DocumentChunk from "../models/DocumentChunk.js";
import { generateEmbedding } from "./embeddingService.js";


// Calculate cosine similarity

const cosineSimilarity = (a, b) => {

    let dot = 0;

    let normA = 0;

    let normB = 0;


    for(let i = 0; i < a.length; i++)
    {
        dot += a[i] * b[i];

        normA += a[i] * a[i];

        normB += b[i] * b[i];
    }


    return dot /
    (
        Math.sqrt(normA) *
        Math.sqrt(normB)
    );
};



export const searchRelevantChunks = async(question)=>{

    try {

        // Create question vector

        const questionEmbedding =
            await generateEmbedding(question);



        // Get all chunks

        const chunks =
            await DocumentChunk.find();



        const scoredChunks =
            chunks.map(chunk=>({

                content: chunk.content,

                documentId: chunk.documentId,

                score:
                cosineSimilarity(
                    questionEmbedding,
                    chunk.embedding
                )

            }));



        // Sort highest similarity

        scoredChunks.sort(
            (a,b)=>b.score-a.score
        );



        // Return top 5 chunks

        return scoredChunks.slice(0,5);



    } catch(error){

        console.log(error);

        throw error;

    }

};