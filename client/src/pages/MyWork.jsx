import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Clock,
  CheckCircle,
  MapPin,
  AlertCircle,
  Send,
} from "lucide-react";
import api from "../lib/api";

function MyWork() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submissions, setSubmissions] = useState({});
  const [submittingId, setSubmittingId] = useState(null);
  const [successMessages, setSuccessMessages] = useState({});

  const fetchMyWork = async () => {
    try {
      const response = await api.get("/jobs/my-work");
      setJobs(response.data.jobs ?? []);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load your work."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyWork();
  }, []);

  const handleSubmitWork = async (jobId) => {
    const workSubmission = submissions[jobId]?.trim();

    if (!workSubmission) {
      setError("Please enter a work description or project link.");
      return;
    }

    setError("");
    setSuccessMessages((prev) => ({ ...prev, [jobId]: "" }));
    setSubmittingId(jobId);

    try {
      const response = await api.patch(
        `/applications/jobs/${jobId}/submit-work`,
        { workSubmission }
      );

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId
            ? { ...job, workSubmission: response.data.job.workSubmission }
            : job
        )
      );

      setSuccessMessages((prev) => ({
        ...prev,
        [jobId]: "Work submitted successfully!",
      }));
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit your work."
      );
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        Loading your work...
      </div>
    );
  }

  if (error && jobs.length === 0) {
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
          Track your assigned jobs and submit completed work.
        </p>
      </div>

      {error && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

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

              {job.status === "in-progress" && (
                <div className="mt-6 border-t border-gray-100 pt-5">
                  <label
                    htmlFor={`submission-${job._id}`}
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    Submit your completed work
                  </label>

                  <textarea
                    id={`submission-${job._id}`}
                    value={submissions[job._id] ?? job.workSubmission ?? ""}
                    onChange={(event) => {
                      const value = event.target.value;
                      setSubmissions((prev) => ({
                        ...prev,
                        [job._id]: value,
                      }));
                    }}
                    maxLength={3000}
                    rows={4}
                    placeholder="Describe your work or paste your project link..."
                    className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                  />

                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>Maximum 3000 characters</span>
                    <span>
                      {(submissions[job._id] ?? job.workSubmission ?? "").length}/3000
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSubmitWork(job._id)}
                    disabled={submittingId === job._id}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-4 py-3 font-semibold text-gray-900 transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Send size={17} />
                    {submittingId === job._id
                      ? "Submitting..."
                      : job.workSubmission
                        ? "Update Submission"
                        : "Submit Work"}
                  </button>

                  {successMessages[job._id] && (
                    <p className="mt-3 flex items-center gap-2 text-sm font-medium text-green-700">
                      <CheckCircle size={17} />
                      {successMessages[job._id]}
                    </p>
                  )}
                </div>
              )}

              {job.status === "completed" && (
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-700">
                  <CheckCircle size={18} />
                  This work has been marked as completed.
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyWork;
