
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  IndianRupee,
  MapPin,
  RefreshCw,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react";
import api from "../lib/api";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  withdrawn: "bg-gray-100 text-gray-600",
};

const formatLocation = (location) => {
  if (!location) return "";
  if (typeof location === "string") return location;

  if (typeof location === "object") {
    return [location.city, location.state, location.country]
      .filter(Boolean)
      .join(", ");
  }

  return "";
};

const formatDate = (date) => {
  if (!date) return "Recently applied";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function MyApplications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/applications/my-applications");

      setApplications(response.data.applications || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load your applications. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusIcon = (status) => {
    if (status === "accepted") return <CheckCircle2 size={15} />;
    if (status === "rejected") return <XCircle size={15} />;
    if (status === "withdrawn") return <XCircle size={15} />;
    return <Clock size={15} />;
  };

  return (
    <div className="min-h-screen bg-[#f7f7f4]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-yellow-400 hover:bg-yellow-50"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </button>

        <section className="relative overflow-hidden rounded-3xl bg-gray-950 p-6 text-white shadow-lg sm:p-9">
          <div className="pointer-events-none absolute -right-12 -top-16 h-60 w-60 rounded-full bg-yellow-400/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-yellow-400">
                HUNTER WORKSPACE
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                My Applications
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-300">
                Track your applications, revisit job details, and follow your
                progress with Providers.
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-gray-950">
              <FileText size={30} />
            </div>
          </div>
        </section>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">
              Your applications
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {applications.length}{" "}
              {applications.length === 1 ? "application" : "applications"}{" "}
              submitted
            </p>
          </div>

          <button
            type="button"
            onClick={fetchApplications}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-yellow-400 disabled:opacity-60"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
          </div>
        ) : error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-white p-8 text-center">
            <AlertCircle size={36} className="mx-auto text-red-500" />
            <p className="mt-4 font-bold text-gray-900">
              Unable to load applications
            </p>
            <p className="mt-2 text-sm text-gray-600">{error}</p>
            <button
              type="button"
              onClick={fetchApplications}
              className="mt-5 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-gray-950 hover:bg-yellow-300"
            >
              Try again
            </button>
          </div>
        ) : applications.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-800">
              <BriefcaseBusiness size={30} />
            </div>
            <h3 className="mt-5 text-xl font-extrabold text-gray-900">
              No applications yet
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Browse available jobs and submit your first application to start
              tracking your progress here.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/browse-jobs")}
              className="mt-6 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-yellow-300"
            >
              Browse jobs
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {applications.map((application) => {
              const job = application.job;
              const provider = application.provider;
              const status = application.status || "pending";

              return (
                <article
                  key={application._id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-yellow-300 sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-yellow-100 px-3 py-1.5 text-xs font-bold text-yellow-900">
                          {job?.category || "General"}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold capitalize ${
                            statusStyles[status] || statusStyles.pending
                          }`}
                        >
                          {getStatusIcon(status)}
                          {status}
                        </span>
                      </div>

                      <h3 className="mt-4 break-words text-xl font-extrabold text-gray-900">
                        {job?.title || "Job no longer available"}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        Provider: {provider?.name || "BOSS member"}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-600">
                        {job?.budget != null && (
                          <span className="inline-flex items-center gap-1">
                            <IndianRupee size={16} />
                            {Number(job.budget).toLocaleString("en-IN")}
                            {job.budgetType === "hourly" ? "/hour" : ""}
                          </span>
                        )}

                        {job?.workType && (
                          <span className="inline-flex items-center gap-1.5 capitalize">
                            <BriefcaseBusiness size={16} />
                            {job.workType}
                          </span>
                        )}

                        {job?.workType !== "online" &&
                          formatLocation(job?.location) && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin size={16} />
                              {formatLocation(job.location)}
                            </span>
                          )}

                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={16} />
                          Applied {formatDate(application.createdAt)}
                        </span>
                      </div>

                      {application.coverLetter && (
                        <details className="mt-5 rounded-xl bg-gray-50 p-4">
                          <summary className="cursor-pointer text-sm font-bold text-gray-800">
                            View your cover letter
                          </summary>
                          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                            {application.coverLetter}
                          </p>
                        </details>
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={!job?._id}
                      onClick={() => navigate(`/dashboard/jobs/${job._id}`)}
                      className="shrink-0 rounded-xl bg-gray-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-yellow-400 hover:text-gray-950 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      View job
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
