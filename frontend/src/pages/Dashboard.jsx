import Navbar from "../components/Navbar";
import Card from "../components/Card";
import ActionCard from "../components/ActionCard";
import Activity from "../components/Activity";
import Badge from "../components/Badge";
import Achievement from "../components/Achievement";

import { Link } from "react-router-dom";

export default function Dashboard() {

return (

<div>

<Navbar/>


<div className="space-y-8">


<div>

<h1 className="text-5xl font-bold">

Welcome Back 👋

</h1>

<p className="text-gray-400 mt-2">

Prepare smarter with InterviewPilot AI

</p>

</div>



<div className="grid md:grid-cols-4 gap-5">

<Card
icon="🎤"
title="Interviews"
value="24"
/>

<Card
icon="📄"
title="ATS Score"
value="86%"
/>

<Card
icon="❓"
title="Questions"
value="143"
/>

<Card
icon="🏆"
title="Ranking"
value="Top 10%"
/>

</div>




<div className="grid md:grid-cols-2 gap-6">


<div className="bg-white/5 rounded-3xl p-8 border border-white/10">

<h2 className="text-2xl font-bold">

Quick Actions

</h2>



<div className="grid grid-cols-2 gap-4 mt-6">


<Link to="/interview">
<ActionCard
icon="🎤"
title="Interview"
/>
</Link>



<Link to="/resume">
<ActionCard
icon="📄"
title="Resume"
/>
</Link>



<Link to="/analytics">
<ActionCard
icon="📈"
title="Analytics"
/>
</Link>



<Link to="/report">
<ActionCard
icon="📊"
title="Reports"
/>
</Link>


</div>


</div>





<div className="bg-white/5 rounded-3xl p-8 border border-white/10">

<h2 className="text-2xl font-bold">

Recent Activity

</h2>



<div className="space-y-4 mt-6">

<Activity

icon="📄"

title="Resume Uploaded"

desc="ATS improved"

/>


<Activity

icon="🎤"

title="Interview Completed"

desc="Performance Updated"

/>


<Activity

icon="📈"

title="Progress Improved"

desc="+12%"

/>

</div>

</div>

</div>






<div className="grid md:grid-cols-2 gap-6">


<div className="bg-white/5 rounded-3xl border border-white/10 p-8">


<h2 className="text-2xl font-bold">

ATS Health

</h2>



<div className="flex justify-center mt-8">


<div className="w-44 h-44 rounded-full border-[12px] border-cyan-500 flex items-center justify-center">


<div>

<h1 className="text-5xl font-bold">

86%

</h1>


<p className="text-gray-400">

Excellent

</p>

</div>

</div>

</div>

</div>





<div className="bg-white/5 rounded-3xl border border-white/10 p-8">


<h2 className="text-2xl font-bold">

🔥 Interview Streak

</h2>



<h1 className="text-7xl font-bold mt-8">

7

</h1>



<p className="text-gray-400">

Days

</p>

</div>

</div>






<div>


<h2 className="text-2xl font-bold">

🏆 Achievements

</h2>



<div className="grid md:grid-cols-3 gap-5 mt-5">


<Achievement name="ATS Master"/>

<Achievement name="7 Day Streak"/>

<Achievement name="Top 10%"/>


</div>

</div>







<div>


<h2 className="text-2xl font-bold">

Target Companies

</h2>



<div className="flex flex-wrap gap-3 mt-5">


<Badge title="Google"/>

<Badge title="Amazon"/>

<Badge title="Microsoft"/>

<Badge title="Meta"/>

<Badge title="TCS"/>

<Badge title="Infosys"/>

<Badge title="Wipro"/>


</div>


</div>



</div>


</div>

)

}