import { searchRelevantChunks } 
from "../services/vectorSearch.js";

import { askGemini } 
from "../services/geminiService.js";

import Conversation from "../models/Conversation.js";



export const chatWithAI = async(req,res)=>{


    try {


        const {question}=req.body;



        if(!question)
        {
            return res.status(400).json({

                message:"Question required"

            });
        }



        // Find relevant document parts

        const relevantChunks =
            await searchRelevantChunks(
                question
            );



        const context =
            relevantChunks
            .map(chunk=>chunk.content)
            .join("\n\n");



        // Ask Gemini

        const answer =
            await askGemini(
                context,
                question
            );



        // Save conversation

        await Conversation.create({

            question,

            answer,

            documents:
            relevantChunks.map(
                item=>item.documentId
            )

        });



        res.json({

            success:true,

            answer,

            sources:
            relevantChunks.map(
                item=>item.documentId
            )

        });



    }
    catch(error)
    {

        console.log(error);


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};