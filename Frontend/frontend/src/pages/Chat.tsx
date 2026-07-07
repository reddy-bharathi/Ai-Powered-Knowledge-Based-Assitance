import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Send,
  Loader2,
  Bot,
  User
} from "lucide-react";


const API = "http://localhost:5000/api/chat";


interface Message {
  role:string;
  text:string;
}


const Chat = () => {


  const navigate = useNavigate();


  const [question,setQuestion] =
      useState("");


  const [messages,setMessages] =
      useState<Message[]>([]);


  const [loading,setLoading] =
      useState(false);



  const askQuestion = async()=>{


    if(!question.trim())
      return;



    const userMessage = {

      role:"user",

      text:question

    };


    setMessages(prev=>[
      ...prev,
      userMessage
    ]);



    setQuestion("");



    try{


      setLoading(true);



      const res =
      await axios.post(
        API,
        {
          question:
          userMessage.text
        }
      );



      setMessages(prev=>[

        ...prev,

        {

          role:"ai",

          text:
          res.data.answer

        }

      ]);



    }
    catch(error)
    {

      setMessages(prev=>[

        ...prev,

        {

          role:"ai",

          text:
          "Unable to get answer."

        }

      ]);

    }
    finally{

      setLoading(false);

    }

  };



return (

<div className="min-h-screen bg-slate-100">


{/* Navbar */}

<div className="bg-blue-700 text-white px-8 py-5 flex justify-between">


<h1 className="text-2xl font-bold">

AI Assistant

</h1>


<button

onClick={()=>navigate("/upload")}

className="bg-white text-blue-700 px-4 py-2 rounded-lg flex gap-2 items-center"

>

<ArrowLeft size={18}/>

Back

</button>


</div>



<div className="max-w-4xl mx-auto p-6">



<div className="bg-white rounded-xl shadow-lg p-6 h-[600px] flex flex-col">



{/* Chat Area */}

<div className="flex-1 overflow-y-auto space-y-4">


{
messages.map(
(message,index)=>(


<div

key={index}

className={`flex gap-3 ${
message.role==="user"
?
"justify-end"
:
"justify-start"
}`}

>


{
message.role==="ai"
?
<Bot className="text-blue-600"/>
:
<User/>
}



<div

className={`px-4 py-3 rounded-xl max-w-[70%]
${
message.role==="user"
?
"bg-blue-600 text-white"
:
"bg-gray-200"
}`}

>

{message.text}

</div>


</div>


))

}



{
loading &&

<div className="flex gap-2 items-center">

<Loader2 className="animate-spin"/>

AI is thinking...

</div>

}



</div>





{/* Input */}


<div className="flex gap-3 mt-5">


<input

value={question}

onChange={
e=>setQuestion(e.target.value)
}

onKeyDown={
e=>{
if(e.key==="Enter")
askQuestion();
}
}

placeholder="Ask something about your document..."

className="flex-1 border rounded-xl px-4 py-3"

/>



<button

onClick={askQuestion}

disabled={loading}

className="bg-blue-600 text-white px-6 rounded-xl flex items-center gap-2"

>

<Send size={18}/>

Send

</button>



</div>



</div>


</div>


</div>

);

};


export default Chat;