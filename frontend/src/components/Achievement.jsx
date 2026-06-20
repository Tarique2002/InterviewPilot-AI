export default function Achievement({ name }) {

return (

<div
className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-cyan-500 hover:scale-105 transition duration-300"
>

<div className="text-4xl">

🏆

</div>


<h2 className="mt-4 font-semibold">

{name}

</h2>


<p className="text-gray-400 mt-2">

Unlocked

</p>


</div>

)

}