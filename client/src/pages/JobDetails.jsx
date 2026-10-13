import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  IndianRupee,
  UserRound,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import api from "../lib/api";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/jobs/${id}`);
        setJob(response.data.job);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load job details. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "Recently posted";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <button
          onClick={() => navigate("/dashboard/browse-jobs")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-yellow-700"
        >
          <ArrowLeft size={18} />
          Back to jobs
        </button>

        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
          <AlertCircle size={36} className="mx-auto text-red-500" />

          <h1 className="mt-4 text-xl font-bold text-gray-900">
            Unable to open this job
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {error || "This job is no longer available."}
          </p>

          <button
            onClick={() => navigate("/dashboard/browse-jobs")}
            className="mt-6 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-gray-950 hover:bg-yellow-300"
          >
            Browse other jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f4]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/dashboard/browse-jobs")}
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-yellow-400 hover:bg-yellow-50"
        >
          <ArrowLeft size={17} />
          Back to jobs
        </button>

        <section className="relative overflow-hidden rounded-3xl bg-gray-950 p-6 text-white shadow-lg sm:p-10">
          <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl" />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-yellow-400 px-3 py-1.5 text-xs font-bold text-gray-950">
                {job.category}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-lg border border-green-400/30 bg-green-400/10 px-3 py-1.5 text-xs font-semibold capitalize text-green-300">
                <CheckCircle2 size={14} />
                {job.status}
              </span>
            </div>

            <h1 className="mt-6 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {job.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-300">
              <span className="flex items-center gap-2">
                <BriefcaseBusiness size={17} className="text-yellow-400" />
                <span className="capitalize">{job.workType} work</span>
              </span>

              {job.workType !== "online" && job.location && (
                <span className="flex items-center gap-2">
                  <MapPin size={17} className="text-yellow-400" />
                  {typeof job.location === "string"
                    ? job.location
                    : job.location && typeof job.location === "object"
                      ? [
                          job.location.city,
                          job.location.state,
                          job.location.country,
                        ]
                          .filter(Boolean)
                          .join(", ")
                      : ""}
                </span>
              )}

              <span className="flex items-center gap-2">
                <CalendarDays size={17} className="text-yellow-400" />
                Posted {formatDate(job.createdAt)}
              </span>
            </div>
          </div>
        </section>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-gray-900">
                About this job
              </h2>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-gray-600">
                {job.description}
              </p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-gray-900">
                Skills and requirements
              </h2>

              {job.skillsRequired?.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.skillsRequired.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-900"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-500">
                  No specific skills were listed for this job.
                </p>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                {job.budgetType === "hourly"
                  ? "Hourly budget"
                  : "Offered budget"}
              </p>

              <p className="mt-2 flex items-center gap-1 text-3xl font-extrabold text-gray-950">
                <IndianRupee size={26} className="text-yellow-600" />
                {Number(job.budget).toLocaleString("en-IN")}
              </p>

              {job.budgetType === "hourly" && (
                <p className="mt-1 text-sm text-gray-500">Per hour</p>
              )}

              <div className="my-6 border-t border-gray-100" />

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <BriefcaseBusiness
                    size={18}
                    className="mt-0.5 text-yellow-700"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Work type</p>
                    <p className="mt-1 capitalize text-gray-500">
                      {job.workType}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 text-yellow-700" />
                  <div>
                    <p className="font-semibold text-gray-900">Job status</p>
                    <p className="mt-1 capitalize text-gray-500">
                      {job.status}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-yellow-50 p-4">
                <p className="text-sm font-bold text-gray-900">
                  Interested in this opportunity?
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-600">
                  The application feature is coming next.
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="font-extrabold text-gray-900">
                About the Provider
              </h2>

              <div className="mt-4 flex items-center gap-3">
                {job.provider?.avatar ? (
                  <img
                    src={job.provider.avatar}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-800">
                    <UserRound size={23} />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="break-words font-bold text-gray-900">
                    {job.provider?.name || "Service Provider"}
                  </p>
                  <p className="text-xs text-gray-500">BOSS member</p>
                </div>
              </div>

              {job.provider?.bio && (
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {job.provider.bio}
                </p>
              )}

              {job.provider?.location && (
                <p className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={16} />
                  {typeof job.provider.location === "string"
                    ? job.provider.location
                    : [
                        job.provider.location.city,
                        job.provider.location.state,
                        job.provider.location.country,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                </p>
              )}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
