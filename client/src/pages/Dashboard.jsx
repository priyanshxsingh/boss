import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, LogOut, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const isProvider = user?.role === "provider";

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-lg font-black text-slate-950">B</span>
            <span className="text-xl font-black text-slate-950">BOSS</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <LogOut size={16} /> Log out
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="rounded-3xl bg-yellow-400 p-7 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-700">
            {user?.role === "admin" ? "Admin workspace" : "Your BOSS workspace"}
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Welcome, {user?.name}!
          </h1>
          <p className="mt-3 max-w-xl leading-7 text-slate-800">
            Your account is ready. We'll build the tools you need to connect skills with opportunities.
          </p>
          <div className="mt-5 inline-flex rounded-full border border-slate-950/10 bg-white/60 px-4 py-2 text-sm font-bold capitalize text-slate-950">
            Account role: {user?.role}
          </div>
        </div>

        <h2 className="mt-10 text-xl font-black text-slate-950">Your next step</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-slate-950">
              {isProvider ? <BriefcaseBusiness size={23} /> : <Search size={23} />}
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-950">
              {isProvider ? "Find the right people" : "Explore opportunities"}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {isProvider
                ? "Your tools for posting services and reviewing applicants will appear here."
                : "Your tools for finding work and managing applications will appear here."}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-400">
              Coming next <ArrowRight size={16} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-bold text-slate-950">Complete your profile</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Add your bio, location, and contact details so people can learn more about you.
            </p>
            <p className="mt-5 text-sm font-semibold text-yellow-700">
              Profile management — coming next
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}