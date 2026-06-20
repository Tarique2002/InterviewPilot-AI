import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-[#0B1120] text-white">

      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 backdrop-blur-xl bg-white/5 p-6 flex flex-col">

        <div>
          <h1 className="text-3xl font-bold mb-10">
            🚀 InterviewPilot
          </h1>

          <nav className="space-y-3">

            <SidebarItem to="/" icon="🏠" text="Dashboard" />
            <SidebarItem to="/interview" icon="🎤" text="Interview Arena" />
            <SidebarItem to="/resume" icon="📄" text="Resume Analyzer" />
            <SidebarItem to="/report" icon="📊" text="Reports" />
            <SidebarItem to="/analytics" icon="📈" text="Analytics" />

          </nav>
        </div>

        {/* Bottom Card */}
        <div className="mt-auto">

          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-5">

            <p className="text-sm text-gray-400">
              Premium Candidate
            </p>

            <h3 className="text-xl font-semibold mt-2">
              Mohd Tarique
            </h3>

            <p className="text-gray-400 mt-1">
              AI Engineer
            </p>

          </div>

        </div>

      </aside>

      {/* Content */}

      <main className="flex-1 overflow-auto p-8">

        {children}

      </main>

    </div>
  );
}


function SidebarItem({ to, icon, text }) {
  return (

    <Link
      to={to}
      className="
      flex items-center gap-3
      p-4 rounded-2xl
      hover:bg-white/10
      transition
      duration-300
      "
    >

      <span>

        {icon}

      </span>

      <span>

        {text}

      </span>

    </Link>

  );
}