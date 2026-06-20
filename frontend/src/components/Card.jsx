export default function Card({icon,title,value}){


return(


<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-cyan-500 hover:scale-105 transition duration-300 cursor-pointer">


<div className="text-3xl">

{icon}

</div>



<p className="text-gray-400 mt-3">

{title}

</p>


<h1 className="text-4xl font-bold mt-2">

{value}

</h1>


</div>

)

}