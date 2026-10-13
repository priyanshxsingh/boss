
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  RefreshCw,
  PlusCircle,
  MapPin,
  Clock,
} from "lucide-react";
import api from "../lib/api";

export default function ManageJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/jobs/my-jobs");
      setJobs(response.data.jobs || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load your jobs. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatBudget = (job) => {
    const amount = Number(job.budget).toLocaleString("en-IN");

    return `₹${amount}${job.budgetType === "hourly" ? "/hr" : ""}`;
  };

  const statusStyles = {
    open: "bg-green-100 text-green-700",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-gray-100 text-gray-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-950"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Manage My Jobs
            </h1>
            <p className="mt-2 text-gray-600">
              View all the opportunities you've posted on BOSS.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard/post-job")}
            className="flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-bold text-gray-950 transition hover:bg-yellow-500"
          >
            <PlusCircle size={19} />
            Post a Job
          </button>
        </div>

        <div className="mb-6 flex items-center justify-between rounded-xl border border-yellow-100 bg-white p-4">
          <div>
            <p className="text-sm text-gray-500">Total jobs posted</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {jobs.length}
            </p>
          </div>

          <button
            type="button"
            onClick={fetchJobs}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={fetchJobs}
              className="font-bold underline"
            >
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
            <RefreshCw
              size={28}
              className="mx-auto animate-spin text-yellow-500"
            />
            <p className="mt-4 text-gray-600">Loading your jobs...</p>
          </div>
        ) : !error && jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-yellow-300 bg-white px-6 py-14 text-center">
            <BriefcaseBusiness
              size={42}
              className="mx-auto text-yellow-500"
            />
            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No jobs posted yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
              Your posted jobs will appear here. Create your first opportunity
              and start finding the right talent.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/post-job")}
              className="mt-6 rounded-xl bg-yellow-400 px-5 py-3 font-bold text-gray-950 hover:bg-yellow-500"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {jobs.map((job) => (
              <article
                key={job._id}
                className="rounded-2xl border border-yellow-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                      <BriefcaseBusiness size={23} />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {job.title}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {job.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
                    <p className="text-lg font-extrabold text-gray-900">
                      {formatBudget(job)}
                    </p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                        statusStyles[job.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {job.status?.replace("-", " ") || "Unknown"}
                    </span>
                  </div>
                </div>

                <p className="mt-5 whitespace-pre-line text-sm leading-6 text-gray-600">
                  {job.description}
                </p>

                {job.skillsRequired?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skillsRequired.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    Posted {formatDate(job.createdAt)}
                  </span>

                  <span className="capitalize">
                    Work type: {job.workType}
                  </span>

                  {job.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
