export default function Activity({icon,title,desc}){


return(


<div className="flex gap-4">


<div className="text-3xl">

{icon}

</div>



<div>


<h3 className="font-semibold">

{title}

</h3>



<p className="text-gray-400 text-sm">

{desc}

</p>


</div>



</div>

)

}