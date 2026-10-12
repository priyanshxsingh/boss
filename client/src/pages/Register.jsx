import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BriefcaseBusiness, Eye, EyeOff, Search, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "hunter",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-yellow-400 p-12 lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex w-fit items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-xl font-black text-yellow-400">B</span>
          <span className="text-2xl font-black text-slate-950">BOSS</span>
        </Link>

        <div className="relative z-10 max-w-xl py-12">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-slate-800">Your next chapter starts here</p>
          <h1 className="text-6xl font-black leading-tight tracking-tight text-slate-950">
            Your skills.<br />Your people.<br />Your opportunity.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-slate-800">
            Join a community that connects people who need work done with people ready to do it.
          </p>
        </div>

        <p className="text-sm font-medium text-slate-800">Bridge Of Skill & Service</p>
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full border-[48px] border-white/30" />
      </aside>

      <main className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-950">
            <ArrowLeft size={16} /> Back to home
          </Link>

          <div className="mb-8 lg:hidden">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400 text-xl font-black text-slate-950">B</span>
            <p className="mt-3 text-2xl font-black text-slate-950">Join BOSS</p>
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-600">Get started for free</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Create your account</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Tell us a little about yourself to get started.</p>

          {error && (
            <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">Full name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={80}
                autoComplete="name"
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  maxLength={72}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
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

            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-slate-700">How will you use BOSS?</legend>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "hunter" })}
                  className={`rounded-xl border p-4 text-left transition ${
                    form.role === "hunter"
                      ? "border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Search size={21} className="mb-3 text-slate-800" />
                  <span className="block text-sm font-bold text-slate-900">Find work</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">Explore jobs and opportunities</span>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "provider" })}
                  className={`rounded-xl border p-4 text-left transition ${
                    form.role === "provider"
                      ? "border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <BriefcaseBusiness size={21} className="mb-3 text-slate-800" />
                  <span className="block text-sm font-bold text-slate-900">Hire people</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">Post work and find talent</span>
                </button>
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UserPlus size={18} />
              {submitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-slate-950 underline decoration-yellow-400 decoration-2 underline-offset-4 hover:text-yellow-700">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}