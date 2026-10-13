import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  MapPin,
  Search,
  RefreshCw,
  IndianRupee,
  CalendarDays,
  AlertCircle,
  ArrowUpRight,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [workType, setWorkType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/jobs");
      setJobs(response.data.jobs || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load jobs. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        job.title?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.category?.toLowerCase().includes(query) ||
        job.skillsRequired?.some((skill) =>
          skill.toLowerCase().includes(query),
        );

      const matchesWorkType = workType === "all" || job.workType === workType;

      return matchesSearch && matchesWorkType;
    });
  }, [jobs, search, workType]);

  const formatDate = (date) => {
    if (!date) return "Recently posted";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatBudget = (job) => {
    const amount = Number(job.budget).toLocaleString("en-IN");
    return `₹${amount}${job.budgetType === "hourly" ? " / hr" : ""}`;
  };

  return (
    <div className="min-h-screen bg-[#f7f7f4]">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[28px] bg-[#171717] px-6 py-10 text-white shadow-lg sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 right-1/3 h-56 w-56 rounded-full bg-yellow-300/10 blur-3xl" />

          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-yellow-300">
              <Sparkles size={14} />
              Opportunities await
            </span>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Find work.
              <span className="block text-yellow-400">Build your future.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
              Discover meaningful opportunities, put your skills to work, and
              connect with Service Providers on BOSS.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-2xl font-extrabold text-yellow-400">
                  {jobs.length}
                </p>
                <p className="mt-1 text-xs text-gray-300">Open opportunities</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-sm font-bold text-white">Flexible work</p>
                <p className="mt-1 text-xs text-gray-300">
                  Online · Offline · Hybrid
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search and filters */}
        <section className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-yellow-600" />
            <h2 className="font-bold text-gray-900">Find your opportunity</h2>
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Job title, category, or skill..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
              />
            </div>

            <select
              value={workType}
              onChange={(event) => setWorkType(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-700 outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
            >
              <option value="all">All work types</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>

            <button
              type="button"
              onClick={fetchJobs}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3.5 text-sm font-bold text-gray-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </section>

        {/* Results heading */}
        <section className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-yellow-700">
              Explore opportunities
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900">
              Latest jobs
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Find work that matches your interests and skills.
            </p>
          </div>

          <p className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600">
            {loading
              ? "Loading jobs..."
              : `${filteredJobs.length} ${
                  filteredJobs.length === 1 ? "result" : "results"
                }`}
          </p>
        </section>

        {/* Error state */}
        {error && (
          <section className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            <AlertCircle size={21} className="mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="font-bold">Couldn't load jobs</p>
              <p className="mt-1 text-sm">{error}</p>
              <button
                type="button"
                onClick={fetchJobs}
                className="mt-3 text-sm font-bold underline underline-offset-4"
              >
                Try again
              </button>
            </div>
          </section>
        )}

        {/* Loading state */}
        {loading && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5"
              >
                <div className="h-6 w-24 rounded-lg bg-gray-100" />
                <div className="mt-5 h-6 w-3/4 rounded-lg bg-gray-100" />
                <div className="mt-3 h-4 w-full rounded bg-gray-100" />
                <div className="mt-2 h-4 w-5/6 rounded bg-gray-100" />
                <div className="mt-6 h-8 w-1/2 rounded-lg bg-gray-100" />
                <div className="mt-6 h-10 rounded-lg bg-gray-100" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredJobs.length === 0 && (
          <section className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">
              <BriefcaseBusiness size={30} />
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-gray-900">
              {jobs.length === 0
                ? "No jobs posted yet"
                : "No matching opportunities"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {jobs.length === 0
                ? "When Service Providers post new jobs, you will find them here."
                : "Try a different keyword or change the work type filter."}
            </p>

            {(search || workType !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setWorkType("all");
                }}
                className="mt-5 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-yellow-300"
              >
                Clear filters
              </button>
            )}
          </section>
        )}

        {/* Job cards */}
        {!loading && !error && filteredJobs.length > 0 && (
          <section className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.map((job) => (
              <article
                key={job._id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-xl hover:shadow-gray-200/60"
              >
                <div className="h-1 w-full bg-yellow-400 transition-colors group-hover:bg-yellow-500" />

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="max-w-[65%] truncate rounded-lg bg-yellow-50 px-3 py-1.5 text-xs font-bold text-yellow-800">
                      {job.category}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold capitalize text-green-700">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      {job.status}
                    </span>
                  </div>

                  <h3 className="mt-5 line-clamp-2 text-xl font-extrabold leading-snug text-gray-900 transition group-hover:text-yellow-800">
                    {job.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-gray-500">
                    {job.description}
                  </p>

                  <div className="mt-5 rounded-xl bg-[#fafaf7] p-4">
                    <p className="text-xs font-medium text-gray-500">
                      {job.budgetType === "hourly"
                        ? "Hourly budget"
                        : "Offered budget"}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-2xl font-extrabold tracking-tight text-gray-900">
                      <IndianRupee size={21} className="text-yellow-600" />
                      {Number(job.budget).toLocaleString("en-IN")}
                      {job.budgetType === "hourly" && (
                        <span className="ml-1 text-sm font-medium text-gray-500">
                          / hour
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-gray-600">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-2 capitalize">
                      <BriefcaseBusiness
                        size={14}
                        className="text-yellow-700"
                      />
                      {job.workType}
                    </span>

                    {job.workType !== "online" && job.location && (
                      <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-2">
                        <MapPin
                          size={14}
                          className="shrink-0 text-yellow-700"
                        />
                        <span className="truncate">{job.location}</span>
                      </span>
                    )}
                  </div>

                  {job.skillsRequired?.length > 0 && (
                    <div className="mt-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                        Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.skillsRequired.slice(0, 4).map((skill, index) => (
                          <span
                            key={`${job._id}-${skill}-${index}`}
                            className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skillsRequired.length > 4 && (
                          <span className="rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-bold text-yellow-800">
                            +{job.skillsRequired.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-6">
                    <div className="mb-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-gray-800">
                          {job.provider?.name || "Service Provider"}
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                          <CalendarDays size={13} />
                          Posted {formatDate(job.createdAt)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(`/dashboard/jobs/${job._id}`)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-yellow-400 hover:text-gray-950"
                    >
                      View Details
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        <footer className="border-t border-gray-200 py-5 text-center text-xs text-gray-400">
          BOSS · Bridge Of Skill &amp; Service
        </footer>
      </div>
    </div>
  );
}
