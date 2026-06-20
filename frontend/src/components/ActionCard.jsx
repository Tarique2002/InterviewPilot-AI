export default function ActionCard({icon,title}){


return(


<div className="bg-black/30 border border-white/10 rounded-2xl p-6 hover:border-cyan-400 hover:scale-105 transition cursor-pointer">


<div className="text-4xl">

{icon}

</div>


<h2 className="mt-4 font-semibold">

{title}

</h2>


</div>


)

}