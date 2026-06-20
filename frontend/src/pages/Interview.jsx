import { useEffect, useState, useRef } from "react";
import axios from "axios";
import API from "../api";


export default function Interview() {

const [messages,setMessages]=useState([]);

const [input,setInput]=useState("");

const [loading,setLoading]=useState(false);

const [company,setCompany]=useState("Google");

const [difficulty,setDifficulty]=useState("Medium");

const [questionNo,setQuestionNo]=useState(1);

const bottomRef=useRef();




useEffect(()=>{

loadQuestion();

},[]);




useEffect(()=>{

bottomRef.current?.scrollIntoView({

behavior:"smooth"

});

},[messages]);





const loadQuestion = async()=>{


try{


const res = await axios.get(

"http://127.0.0.1:8000/start"

);



setMessages([

{

role:"ai",

text:res.data.question

}

]);



}


catch{


setMessages([


{

role:"ai",

text:"Backend unavailable"

}

]);


}



};






const sendMessage = async()=>{


if(!input.trim()) return;



const userText=input;






setMessages(prev=>[


...prev,


{

role:"user",

text:userText

}


]);





setInput("");

setLoading(true);






try{



const res = await axios.post(


"http://127.0.0.1:8000/evaluate",


{

text:userText

}


);






setMessages(prev=>[


...prev,


{

role:"ai",

text:res.data.feedback

}



]);




}



catch{



setMessages(prev=>[


...prev,


{


role:"ai",


text:"Backend Error"


}



]);



}




setLoading(false);




if(questionNo<5){

setQuestionNo(questionNo+1);

}



};








const resetInterview=()=>{


setQuestionNo(1);

loadQuestion();


};








return(



<div className="h-full flex flex-col">





<div className="mb-6">



<h1 className="text-4xl font-bold">


🎤 Interview Arena


</h1>



<p className="text-gray-400 mt-2">


AI Powered Mock Interviews


</p>







<div className="grid md:grid-cols-2 gap-4 mt-6">






<select


value={company}


onChange={(e)=>setCompany(e.target.value)}



className="bg-black border border-white/10 rounded-xl p-3"

>


<option>Google</option>

<option>Amazon</option>

<option>Microsoft</option>

<option>TCS</option>

<option>Infosys</option>

<option>Meta</option>


</select>






<select



value={difficulty}



onChange={(e)=>setDifficulty(e.target.value)}



className="bg-black border border-white/10 rounded-xl p-3"



>


<option>

Easy

</option>



<option>

Medium

</option>



<option>

Hard

</option>




</select>






</div>








<div className="mt-6">



<div className="flex justify-between mb-2">



<p>


Question {questionNo}/5


</p>




<p>


{difficulty}


</p>



</div>







<div className="w-full bg-white/10 rounded-full h-3">





<div


style={{

width:`${questionNo*20}%`

}}

className="bg-cyan-500 h-3 rounded-full transition-all"


>



</div>




</div>






</div>




</div>










<div className="flex-1 overflow-y-auto bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">






{

messages.map((msg,index)=>(





<div


key={index}



className={`


max-w-[80%]


p-4


rounded-2xl




${



msg.role==="ai"



?

"bg-white/10"



:

"bg-cyan-600 ml-auto"




}



`}





>





<div className="font-semibold mb-2">





{


msg.role==="ai"



?

"🤖 InterviewPilot"



:

"👤 You"



}





</div>





<p className="whitespace-pre-wrap">


{msg.text}


</p>






</div>





))


}










{


loading &&(




<div className="bg-white/10 rounded-2xl p-4 max-w-sm">





<div className="flex gap-2">



<div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>


<div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>


<div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>



</div>




</div>




)

}




<div ref={bottomRef}></div>





</div>









<div className="mt-4 flex gap-3 items-center">





<button


onClick={resetInterview}



className="bg-purple-500 px-5 py-4 rounded-2xl hover:scale-105 transition"



>


New


</button>






<button



className="bg-green-500 px-5 py-4 rounded-2xl hover:scale-105 transition"



>


🎤



</button>








<input



value={input}



onChange={(e)=>setInput(e.target.value)}






onKeyDown={(e)=>{


if(e.key==="Enter"){


sendMessage();


}


}}






placeholder="Type your answer..."





className="flex-1 p-4 rounded-2xl bg-black border border-white/10 outline-none"





/>








<button



onClick={sendMessage}




className="bg-cyan-500 px-6 py-4 rounded-2xl hover:scale-105 transition"



>



Send



</button>





</div>






</div>



);



}