import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  UploadCloud,
  FileText,
  Trash2,
  ArrowLeft,
  Loader2,
  MessageCircle,
} from "lucide-react";


const API = "http://localhost:5000/api/documents";


interface DocumentType {
  _id: string;
  originalName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}



const Upload = () => {

  const navigate = useNavigate();


  const fileInputRef =
    useRef<HTMLInputElement>(null);



  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);



  const [loading, setLoading] =
    useState(false);



  const [documents, setDocuments] =
    useState<DocumentType[]>([]);



  const [aiEnabled, setAiEnabled] =
    useState(false);



  const fetchDocuments = async () => {

    try {

      const res = await axios.get(API);


      const docs =
        res.data.documents || [];


      setDocuments(docs);


      // Enable AI only if documents exist

      setAiEnabled(
        docs.length > 0
      );


    } catch (err) {

      console.log(err);

    }

  };



  useEffect(() => {

    fetchDocuments();

  }, []);





  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files)
      return;


    setSelectedFile(
      e.target.files[0]
    );

  };





  const uploadFile = async () => {


    if (!selectedFile) {

      alert(
        "Please select a document."
      );

      return;

    }



    const formData =
      new FormData();



    formData.append(
      "document",
      selectedFile
    );



    try {


      setLoading(true);



      await axios.post(
        API,
        formData
      );



      alert(
        "Document Uploaded Successfully"
      );



      setSelectedFile(null);



      await fetchDocuments();



    } catch (err:any) {


      alert(
        err.response?.data?.message ||
        "Upload Failed"
      );


    } finally {


      setLoading(false);

    }

  };





  const deleteDocument = async (
    id:string
  ) => {


    try {


      await axios.delete(
        `${API}/${id}`
      );



      await fetchDocuments();



    } catch(err) {


      console.log(err);

    }

  };





  return (

    <div className="min-h-screen bg-slate-100">


      {/* Navbar */}

      <div className="bg-blue-700 text-white flex justify-between items-center px-8 py-5 shadow">


        <h1 className="text-2xl font-bold">

          Upload Documents

        </h1>



        <button

          onClick={() =>
            navigate("/dashboard")
          }

          className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg"

        >

          <ArrowLeft size={18}/>

          Dashboard

        </button>


      </div>





      <div className="max-w-6xl mx-auto py-10 px-5">



        {/* Upload Card */}


        <div className="bg-white rounded-2xl shadow-xl p-8">



          <div

            onClick={() =>
              fileInputRef.current?.click()
            }

            className="border-2 border-dashed border-blue-400 rounded-2xl p-10 text-center cursor-pointer hover:bg-blue-50 transition"

          >


            <UploadCloud

              className="mx-auto text-blue-600"

              size={60}

            />



            <h2 className="text-2xl font-bold mt-4">

              Upload Document

            </h2>



            <p className="text-gray-500 mt-2">

              PDF, TXT and Markdown files only

            </p>



            {
              selectedFile && (

                <p className="mt-5 text-green-600 font-semibold">

                  {selectedFile.name}

                </p>

              )
            }


          </div>





          <input

            type="file"

            hidden

            ref={fileInputRef}

            accept=".pdf,.txt,.md"

            onChange={handleFileChange}

          />





          <button

            onClick={uploadFile}

            disabled={loading}

            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold"

          >

          {
            loading ?

            (

              <span className="flex justify-center items-center gap-2">


                <Loader2

                  className="animate-spin"

                  size={20}

                />


                Uploading...


              </span>

            )

            :

            "Upload Document"

          }


          </button>





          {/* Ask AI Button */}


          <button

            disabled={!aiEnabled}

            onClick={() =>
              navigate("/chat")
            }


            className={`mt-4 w-full py-3 rounded-xl text-lg font-semibold flex justify-center items-center gap-2

            ${
              aiEnabled

              ?

              "bg-green-600 hover:bg-green-700 text-white"

              :

              "bg-gray-300 text-gray-600 cursor-not-allowed"

            }

            `}

          >

            <MessageCircle size={20}/>


            Ask AI


          </button>



        </div>





        {/* Documents List */}



        <div className="mt-10">


          <h2 className="text-3xl font-bold mb-6">

            Uploaded Documents

          </h2>




          {
            documents.length === 0

            ?

            (

              <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">


                No documents uploaded.


              </div>

            )


            :

            (

              <div className="grid md:grid-cols-2 gap-5">


                {
                  documents.map((doc)=>(


                    <div

                      key={doc._id}

                      className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center"

                    >



                      <div className="flex items-center gap-3">


                        <FileText

                          className="text-blue-600"

                        />



                        <div>


                          <h3 className="font-bold">

                            {doc.originalName}

                          </h3>



                          <p className="text-sm text-gray-500">

                            {
                              (
                                doc.fileSize / 1024
                              ).toFixed(2)
                            }

                            KB

                          </p>



                        </div>



                      </div>




                      <button

                        onClick={() =>
                          deleteDocument(doc._id)
                        }

                        className="text-red-600 hover:text-red-800"

                      >

                        <Trash2/>


                      </button>



                    </div>


                  ))
                }


              </div>

            )

          }


        </div>



      </div>


    </div>

  );

};


export default Upload;