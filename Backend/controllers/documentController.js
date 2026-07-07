import Document from "../models/Document.js";
import DocumentChunk from "../models/DocumentChunk.js";

import { extractText } from "../services/extractText.js";
import { chunkText } from "../services/chunkText.js";
import { generateEmbedding } from "../services/embeddingService.js";

import fs from "fs";


// ===============================
// Upload Document
// ===============================

export const uploadDocument = async (req, res) => {

  try {


    if (!req.file) {

      return res.status(400).json({

        success: false,

        message: "No file uploaded"

      });

    }



    // Save document details

    const document = await Document.create({

      fileName: req.file.filename,

      originalName: req.file.originalname,

      fileType: req.file.mimetype,

      fileSize: req.file.size,

      filePath: req.file.path,


      // Authentication will be added later

      uploadedBy: null,

    });





    // ===============================
    // Extract Text
    // ===============================


    const text =
      await extractText(
        req.file.path
      );



    if (!text || text.trim().length === 0) {


      return res.status(400).json({

        success:false,

        message:
        "Could not extract text from document"

      });

    }





    // ===============================
    // Create Chunks
    // ===============================


    const chunks =
      chunkText(text);






    // ===============================
    // Generate Embeddings
    // ===============================


    const chunkDocuments = [];



    for(
      let i = 0;
      i < chunks.length;
      i++
    )
    {


      const embedding =
        await generateEmbedding(
          chunks[i]
        );



      chunkDocuments.push({

        documentId:
          document._id,


        chunkIndex:
          i,


        content:
          chunks[i],


        embedding

      });


    }





    // Save chunks

    await DocumentChunk.insertMany(
      chunkDocuments
    );





    res.status(201).json({

      success:true,


      message:
      "Document uploaded and processed successfully",


      document,


      totalChunks:
      chunkDocuments.length

    });



  }

  catch(error){


    console.log(
      "Upload Error:",
      error
    );



    res.status(500).json({

      success:false,

      message:
      error.message

    });


  }

};






// ===============================
// Get All Documents
// ===============================

export const getDocuments = async (
  req,
  res
) => {


  try {


    const documents =
      await Document.find()
      .sort({
        createdAt:-1
      });




    res.json({

      success:true,


      count:
      documents.length,


      documents

    });



  }

  catch(error){


    res.status(500).json({

      success:false,

      message:
      error.message

    });


  }

};







// ===============================
// Delete Document
// ===============================

export const deleteDocument = async (
  req,
  res
) => {


  try {



    const document =
      await Document.findById(
        req.params.id
      );




    if(!document){


      return res.status(404).json({

        success:false,

        message:
        "Document not found"

      });


    }






    // Delete uploaded file

    if(
      fs.existsSync(
        document.filePath
      )
    )
    {

      fs.unlinkSync(
        document.filePath
      );

    }






    // Delete AI chunks

    await DocumentChunk.deleteMany({

      documentId:
      document._id

    });






    // Delete document record

    await Document.findByIdAndDelete(

      document._id

    );






    res.json({

      success:true,

      message:
      "Document deleted successfully"

    });





  }

  catch(error){


    console.log(
      "Delete Error:",
      error
    );



    res.status(500).json({

      success:false,

      message:
      error.message

    });


  }

};