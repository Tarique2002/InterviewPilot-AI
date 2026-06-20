import { Bell, Search } from "lucide-react";

export default function Navbar(){

return(

<div className="mb-10">

<div className="bg-white/5 border border-white/10 rounded-3xl p-4 flex justify-between items-center">


<div>

<h1 className="text-2xl font-bold">

InterviewPilot AI

</h1>

<p className="text-gray-400">

Premium Dashboard

</p>

</div>



<div className="hidden md:flex items-center gap-3 bg-black/30 border border-white/10 px-4 py-3 rounded-xl w-[350px]">

<Search size={18}/>

<input

placeholder="Search..."

className="bg-transparent flex-1 outline-none"

/>

</div>




<div className="flex items-center gap-5">

<div className="relative">

<Bell size={22}/>

<div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></div>

</div>


<div className="bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 rounded-full">

⭐ Premium

</div>


<div className="w-11 h-11 rounded-full bg-cyan-500 flex justify-center items-center font-bold">

TA

</div>

</div>


</div>

</div>

)

}