import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Hammer,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";

const categories = [
  { name: "Technology", detail: "Development, IT & tech support", icon: Code2, color: "bg-yellow-50 text-yellow-500" },
  { name: "Design & Creative", detail: "Graphics, UI/UX & branding", icon: Palette, color: "bg-pink-50 text-pink-600" },
  { name: "Home Services", detail: "Repairs, maintenance & help", icon: Hammer, color: "bg-amber-50 text-amber-700" },
  { name: "Professional Work", detail: "Business, writing & consulting", icon: BriefcaseBusiness, color: "bg-emerald-50 text-emerald-700" },
  { name: "Repairs & Support", detail: "Electrical, plumbing & more", icon: Wrench, color: "bg-sky-50 text-sky-700" },
  { name: "Other Services", detail: "Find help for what you need", icon: Sparkles, color: "bg-violet-50 text-violet-600" },
];

function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-yellow-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-yellow-100 bg-white px-4 py-2 text-xs font-semibold text-yellow-600 shadow-sm">
                <Sparkles size={15} />
                One platform. Endless possibilities.
              </div>

              <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Skills meet
                <span className="block text-yellow-500">opportunity.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                Find the right people for the work you need, or turn your skills
                into opportunities. BOSS brings people, services and ideas together.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-500 px-7 py-4 font-semibold text-white shadow-lg shadow-yellow-500/20 transition hover:-translate-y-0.5 hover:bg-yellow-600">
                  Find your opportunity <ArrowRight size={18} />
                </Link>
                <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:border-yellow-200 hover:text-yellow-500">
                  Explore services
                </a>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
                <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-600" /> Account-based access</span>
                <span className="flex items-center gap-2"><Users size={17} className="text-yellow-500" /> Built for everyone</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-yellow-200/60 to-sky-100/60 blur-2xl" />
              <div className="relative rounded-[2rem] border border-white bg-white p-6 shadow-2xl shadow-slate-300/40 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Your next step starts here</p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-950">What are you looking for?</h2>
                  </div>
                  <div className="rounded-2xl bg-yellow-50 p-3 text-yellow-500"><Search size={24} /></div>
                </div>

                <div className="mt-7 space-y-3">
                  <Link to="/register" className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-yellow-300 hover:bg-yellow-50/50">
                    <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600"><Search size={22} /></div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900">I need a service</h3>
                      <p className="mt-1 text-sm text-slate-500">Discover skilled people for your task</p>
                    </div>
                    <ArrowUpRight size={19} className="text-slate-400 transition group-hover:text-yellow-500" />
                  </Link>

                  <Link to="/register" className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-yellow-300 hover:bg-yellow-50/50">
                    <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700"><BriefcaseBusiness size={22} /></div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900">I want to find work</h3>
                      <p className="mt-1 text-sm text-slate-500">Put your skills to work and grow</p>
                    </div>
                    <ArrowUpRight size={19} className="text-slate-400 transition group-hover:text-yellow-500" />
                  </Link>
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-600">The BOSS promise</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    A simpler way to connect skills with real-world needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-24 bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-500">Explore possibilities</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">One place for every kind of work.</h2>
                <p className="mt-3 max-w-2xl leading-7 text-slate-600">From digital projects to everyday services, find the skills you need or opportunities that fit you.</p>
              </div>
              <Link to="/register" className="inline-flex items-center gap-2 font-semibold text-yellow-500 hover:text-yellow-600">
                Get started <ArrowRight size={17} />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map(({ name, detail, icon: Icon, color }) => (
                <Link to="/register" key={name} className="group rounded-3xl border border-slate-200/80 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-yellow-200 hover:shadow-xl hover:shadow-slate-200/40">
                  <div className={`inline-flex rounded-2xl p-3 ${color}`}><Icon size={24} /></div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-yellow-500">
                    Explore category <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-500">Simple by design</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Three steps to get moving.</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { number: "01", title: "Create your account", text: "Choose whether you want to offer services or find work." },
                { number: "02", title: "Connect with people", text: "Explore relevant opportunities and services." },
                { number: "03", title: "Get work done", text: "Move forward with clearer communication and expectations." },
              ].map((step) => (
                <div key={step.number} className="rounded-3xl border border-slate-200 bg-white p-7">
                  <p className="text-sm font-black tracking-widest text-yellow-500">{step.number}</p>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[2rem] bg-yellow-500 p-8 text-white sm:p-12 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-yellow-200">Your next opportunity is waiting</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black sm:text-4xl">Bring your skills. Find your people.</h2>
            </div>
            <Link to="/register" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-4 font-bold text-yellow-600 transition hover:bg-yellow-50">
              Join BOSS <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <span>© {new Date().getFullYear()} BOSS — Bridge Of Skill & Service</span>
          <span>Connecting people, skills and opportunity.</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;