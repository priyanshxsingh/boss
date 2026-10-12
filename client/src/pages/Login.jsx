import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to log in. Please check your details."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-yellow-400 p-12 lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex w-fit items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-xl font-black text-yellow-400">B</span>
          <span className="text-2xl font-black text-slate-950">BOSS</span>
        </Link>

        <div className="relative z-10 max-w-xl py-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-800">Welcome back</p>
          <h1 className="mt-5 text-6xl font-black leading-tight tracking-tight text-slate-950">
            Good work<br />starts with<br />great connections.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-slate-800">
            Pick up where you left off. Your next opportunity is waiting.
          </p>
        </div>

        <p className="text-sm font-medium text-slate-800">Bridge Of Skill & Service</p>
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full border-[48px] border-white/30" />
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-950">
            <ArrowLeft size={16} /> Back to home
          </Link>

          <div className="mb-8 lg:hidden">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400 text-xl font-black text-slate-950">B</span>
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-600">Log in to BOSS</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Welcome back.</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Enter your account details to continue.</p>

          {error && (
            <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                required
                maxLength={254}
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-500 hover:text-slate-950"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn size={18} />
              {submitting ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            New to BOSS?{" "}
            <Link to="/register" className="font-bold text-slate-950 underline decoration-yellow-400 decoration-2 underline-offset-4 hover:text-yellow-700">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}