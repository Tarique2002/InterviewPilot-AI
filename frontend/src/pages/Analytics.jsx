import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
}
from "recharts";


const data=[

{
day:"Mon",
score:65
},

{
day:"Tue",
score:72
},

{
day:"Wed",
score:78
},

{
day:"Thu",
score:80
},

{
day:"Fri",
score:84
},

{
day:"Sat",
score:87
},

{
day:"Sun",
score:91
}

];




export default function Analytics(){

return(

<div>



<h1 className="text-4xl font-bold mb-2">

📈 Analytics

</h1>



<p className="text-gray-400 mb-10">

Track your interview journey

</p>






{/* TOP CARDS */}


<div className="grid grid-cols-4 gap-5">


<Card
title="Interviews"
value="25"
emoji="🎤"
/>



<Card
title="ATS"
value="86%"
emoji="📄"
/>



<Card
title="Questions"
value="143"
emoji="❓"
/>



<Card
title="Streak"
value="7 Days"
emoji="🔥"
/>



</div>







<div className="grid md:grid-cols-2 gap-6 mt-10">


{/* CHART */}



<div className="bg-white/5 rounded-3xl p-6 border border-white/10">


<h2 className="text-2xl font-semibold mb-6">

Performance Trend

</h2>



<div style={{height:300}}>


<ResponsiveContainer>


<LineChart data={data}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="day"/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="score"

stroke="#06b6d4"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>



</div>


</div>






{/* READINESS */}


<div className="bg-white/5 rounded-3xl p-6 border border-white/10">


<h2 className="text-2xl font-semibold mb-6">

Placement Readiness

</h2>




<div className="flex justify-center">


<div className="relative">


<div className="absolute inset-0 rounded-full bg-cyan-500 blur-3xl opacity-20 animate-pulse">

</div>



<div className="w-44 h-44 rounded-full border-[10px] border-cyan-500 flex items-center justify-center bg-black/30">


<div className="text-center">


<h1 className="text-5xl font-bold">

82%

</h1>


<p className="text-sm text-gray-400 mt-1">

Placement Ready

</p>


<p className="text-green-400 mt-2">

▲ +12%

</p>



</div>


</div>



</div>


</div>






<div className="mt-10 space-y-5">


<Item
text="Python"
level="95%"
/>


<Item
text="Machine Learning"
level="88%"
/>


<Item
text="FastAPI"
level="92%"
/>



<Item
text="React"
level="85%"
/>



<Item
text="Ollama"
level="80%"
/>



</div>



</div>



</div>







{/* ACHIEVEMENTS */}



<div className="bg-white/5 rounded-3xl border border-white/10 p-6 mt-10">


<h2 className="text-2xl font-semibold mb-5">

Achievements

</h2>




<div className="grid grid-cols-4 gap-4">



<Badge

emoji="🔥"

title="7 Day Streak"

/>



<Badge

emoji="🎯"

title="80% Accuracy"

/>



<Badge

emoji="🏆"

title="Top 10%"

/>



<Badge

emoji="⭐"

title="143 Questions"

/>



</div>


</div>






</div>

)



}






function Card({title,value,emoji}){


return(


<div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:scale-105 transition">


<p className="text-3xl">

{emoji}

</p>



<p className="text-gray-400 mt-3">

{title}

</p>



<h1 className="text-3xl font-bold mt-2">

{value}

</h1>


</div>


)

}








function Item({text,level}){


return(


<div>


<div className="flex justify-between mb-2">


<p>

{text}

</p>



<p className="text-cyan-400">

{level}

</p>


</div>



<div className="bg-white/10 rounded-full h-3 overflow-hidden">


<div

style={{
width:level
}}

className="bg-cyan-500 h-3 rounded-full"


>

</div>



</div>



</div>


)

}








function Badge({emoji,title}){


return(


<div className="bg-white/5 border border-white/10 rounded-3xl p-5 text-center hover:border-cyan-500 hover:scale-105 transition">


<div className="text-3xl">

{emoji}

</div>



<p className="mt-3">

{title}

</p>



</div>


)


}