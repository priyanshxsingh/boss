import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  Users,
  UserRound,
  CheckCircle,
  ClipboardCheck,
  ExternalLink,
} from "lucide-react";
import api from "../lib/api";

function ReviewApplicants() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [applications, setApplications] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [hiringId, setHiringId] = useState(null);
  const [completing, setCompleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchJobs = async () => {
    try {
      setLoadingJobs(true);
      setError("");

      const response = await api.get("/jobs/my-jobs");
      const myJobs = response.data.jobs ?? response.data;

      setJobs(Array.isArray(myJobs) ? myJobs : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load your jobs.");
    } finally {
      setLoadingJobs(false);
    }
  };

  const fetchApplicants = async (jobId) => {
    if (!jobId) {
      setApplications([]);
      return;
    }

    try {
      setLoadingApplicants(true);
      setError("");

      const response = await api.get(
        `/applications/jobs/${jobId}/applicants`
      );

      setApplications(response.data.applications ?? []);
    } catch (err) {
      setApplications([]);
      setError(err.response?.data?.message || "Failed to load applicants.");
    } finally {
      setLoadingApplicants(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    fetchApplicants(selectedJob);
    setSuccessMessage("");
  }, [selectedJob]);

  const selectedJobDetails = jobs.find((job) => job._id === selectedJob);

  const handleUpdateStatus = async (applicationId, status) => {
    const action = status === "accepted" ? "accept" : "reject";

    if (!window.confirm(`Are you sure you want to ${action} this application?`)) {
      return;
    }

    try {
      setUpdatingId(applicationId);
      setError("");

      await api.patch(`/applications/${applicationId}/status`, { status });

      await fetchApplicants(selectedJob);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update application status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleHire = async (applicationId) => {
    if (
      !window.confirm(
        "Hire this Hunter? The job will be marked as in progress."
      )
    ) {
      return;
    }

    try {
      setHiringId(applicationId);
      setError("");

      await api.patch(`/applications/${applicationId}/hire`);

      await fetchApplicants(selectedJob);
      await fetchJobs();

      window.alert("Hunter hired successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to hire this Hunter.");
    } finally {
      setHiringId(null);
    }
  };

  const handleConfirmCompletion = async () => {
    if (!selectedJob) return;

    if (
      !window.confirm(
        "Confirm that you have reviewed the submitted work and it is complete?"
      )
    ) {
      return;
    }

    try {
      setCompleting(true);
      setError("");
      setSuccessMessage("");

      const response = await api.patch(
        `/applications/jobs/${selectedJob}/confirm-completion`
      );

      setJobs((previousJobs) =>
        previousJobs.map((job) =>
          job._id === selectedJob
            ? { ...job, status: response.data.job.status }
            : job
        )
      );

      setSuccessMessage("Work confirmed! This job is now completed.");
      await fetchApplicants(selectedJob);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to confirm work completion."
      );
    } finally {
      setCompleting(false);
    }
  };

  const hasSubmission = Boolean(
    selectedJobDetails?.workSubmission?.trim()
  );

  return (
    <div className="min-h-screen bg-white px-4 py-8 text-black sm:px-8">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
              Provider Workspace
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Review Applicants
            </h1>
            <p className="mt-2 text-gray-600">
              Review applicants, inspect submitted work, and manage completion.
            </p>
          </div>

          <button
            onClick={async () => {
              await fetchJobs();
              if (selectedJob) await fetchApplicants(selectedJob);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-100"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <CheckCircle size={18} />
            {successMessage}
          </div>
        )}

        <section className="rounded-2xl border border-gray-200 p-5 shadow-sm sm:p-6">
          <label htmlFor="job-select" className="mb-2 block font-semibold">
            Select one of your jobs
          </label>

          {loadingJobs ? (
            <p className="text-gray-500">Loading your jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-600">You haven't posted any jobs yet.</p>
          ) : (
            <select
              id="job-select"
              value={selectedJob}
              onChange={(event) => setSelectedJob(event.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:border-yellow-500"
            >
              <option value="">Choose a job...</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title} — {job.status}
                </option>
              ))}
            </select>
          )}
        </section>

        {selectedJob && selectedJobDetails && (
          <section className="mt-6 rounded-2xl border border-gray-200 p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-yellow-100 p-3">
                <ClipboardCheck size={23} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Work Submission</h2>
                <p className="text-sm text-gray-500">
                  {selectedJobDetails.title}
                </p>
              </div>
            </div>

            {selectedJobDetails.status === "completed" ? (
              <div className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-800">
                <CheckCircle size={20} />
                This job has been marked as completed.
              </div>
            ) : selectedJobDetails.status !== "in-progress" ? (
              <p className="text-sm text-gray-600">
                Work submissions become available after you hire a Hunter.
              </p>
            ) : !hasSubmission ? (
              <p className="rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">
                The Hunter hasn't submitted their work yet. Refresh this page
                after they submit it.
              </p>
            ) : (
              <>
                <div className="whitespace-pre-wrap break-words rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-800">
                  {selectedJobDetails.workSubmission}
                </div>

                {/^https?:\/\/\S+$/i.test(
                  selectedJobDetails.workSubmission.trim()
                ) && (
                  <a
                    href={selectedJobDetails.workSubmission.trim()}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
                  >
                    Open submitted link
                    <ExternalLink size={15} />
                  </a>
                )}

                <button
                  onClick={handleConfirmCompletion}
                  disabled={completing}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-bold text-black transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <CheckCircle size={18} />
                  {completing ? "Confirming..." : "Confirm Completion"}
                </button>
              </>
            )}
          </section>
        )}

        {selectedJob && (
          <div className="mt-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-yellow-100 p-3">
                <Users size={23} />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {selectedJobDetails?.title || "Applicants"}
                </h2>
                <p className="text-sm text-gray-500">
                  {applications.length} applicant
                  {applications.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            {loadingApplicants ? (
              <p className="py-8 text-center text-gray-500">
                Loading applicants...
              </p>
            ) : applications.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center">
                <Users size={36} className="mx-auto mb-3 text-gray-400" />
                <h3 className="font-bold">No applicants yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Applicants will appear here when someone applies.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((application) => (
                  <article
                    key={application._id}
                    className="rounded-2xl border border-gray-200 p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-yellow-100">
                          {application.hunter?.avatar ? (
                            <img
                              src={application.hunter.avatar}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <UserRound size={22} />
                          )}
                        </div>

                        <div>
                          <h3 className="font-bold">
                            {application.hunter?.name || "Unknown applicant"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Applied{" "}
                            {new Date(
                              application.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold capitalize">
                          {application.status}
                        </span>

                        {application.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateStatus(application._id, "accepted")
                              }
                              disabled={updatingId === application._id}
                              className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-yellow-500 disabled:opacity-50"
                            >
                              {updatingId === application._id
                                ? "Updating..."
                                : "✓ Accept"}
                            </button>

                            <button
                              onClick={() =>
                                handleUpdateStatus(application._id, "rejected")
                              }
                              disabled={updatingId === application._id}
                              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                            >
                              {updatingId === application._id
                                ? "Updating..."
                                : "✕ Reject"}
                            </button>
                          </>
                        )}

                        {application.status === "accepted" &&
                          selectedJobDetails?.status === "open" && (
                            <button
                              onClick={() => handleHire(application._id)}
                              disabled={hiringId === application._id}
                              className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-2.5 text-sm font-bold text-white transition hover:bg-gray-800 disabled:opacity-50"
                            >
                              {hiringId === application._id
                                ? "Hiring..."
                                : "Hire Hunter"}
                            </button>
                          )}

                        {application.status === "accepted" &&
                          selectedJobDetails?.status === "in-progress" && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                              Job in progress
                            </span>
                          )}
                      </div>
                    </div>

                    {application.hunter?.bio && (
                      <p className="mt-4 text-sm text-gray-600">
                        {application.hunter.bio}
                      </p>
                    )}

                    <div className="mt-5">
                      <h4 className="font-semibold">Cover letter</h4>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                        {application.coverLetter}
                      </p>
                    </div>

                    {application.experience && (
                      <div className="mt-4">
                        <h4 className="font-semibold">Experience</h4>
                        <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                          {application.experience}
                        </p>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewApplicants;
