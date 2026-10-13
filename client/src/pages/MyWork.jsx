import { useEffect, useState } from "react";
import { BriefcaseBusiness, Clock, CheckCircle, MapPin, AlertCircle } from "lucide-react";
import api from "../lib/api";

function MyWork() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyWork = async () => {
      try {
        const response = await api.get("/jobs/my-work");
        setJobs(response.data.jobs ?? []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load your work.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyWork();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        Loading your work...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle size={20} />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-yellow-600">
          Hunter Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          My Work
        </h1>
        <p className="mt-2 text-gray-600">
          Track the jobs you've been hired for.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <BriefcaseBusiness size={42} className="mx-auto text-gray-400" />
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No work assigned yet
          </h2>
          <p className="mt-2 text-gray-600">
            Once a provider hires you, the job will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {jobs.map((job) => (
            <article
              key={job._id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-bold text-gray-900">
                  {job.title}
                </h2>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                    job.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {job.status === "completed" ? "Completed" : "In Progress"}
                </span>
              </div>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                {job.description}
              </p>

              <div className="mt-5 space-y-3 text-sm text-gray-700">
                {job.provider?.name && (
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness size={17} className="text-gray-500" />
                    <span>
                      Provider: <strong>{job.provider.name}</strong>
                    </span>
                  </div>
                )}

                {job.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={17} className="text-gray-500" />
                    <span>{job.location}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {job.status === "completed" ? (
                    <CheckCircle size={17} className="text-green-600" />
                  ) : (
                    <Clock size={17} className="text-yellow-600" />
                  )}
                  <span>
                    Budget: {job.budgetType === "hourly" ? "Hourly" : "Fixed"}{" "}
                    · ₹{job.budget}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyWork;