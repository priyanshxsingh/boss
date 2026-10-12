import { Link } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-500 text-lg font-black text-white">
            B
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-950">
              BOSS
            </span>
            <p className="-mt-1 text-[10px] font-semibold tracking-[0.18em] text-slate-500">
              BRIDGE OF SKILL & SERVICE
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#services" className="text-sm font-medium text-slate-600 hover:text-yellow-500">
            Explore services
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-yellow-500">
            How it works
          </a>
          <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-yellow-500">
            Log in
          </Link>
          <Link to="/register" className="flex items-center gap-2 rounded-full bg-yellow-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-yellow-600">
            Get started <ArrowUpRight size={16} />
          </Link>
        </div>

        <button
          type="button"
          className="rounded-xl p-2 text-slate-700 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="space-y-4 border-t border-slate-200 bg-white px-5 py-5 md:hidden">
          <a href="#services" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-slate-700">
            Explore services
          </a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-slate-700">
            How it works
          </a>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-slate-700">
            Log in
          </Link>
          <Link to="/register" onClick={() => setMenuOpen(false)} className="block rounded-xl bg-yellow-500 px-4 py-3 text-center text-sm font-semibold text-white">
            Get started
          </Link>
        </div>
      )}
    </header>
  );
}