
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BriefcaseBusiness, LoaderCircle } from "lucide-react";
import api from "../lib/api";

export default function PostJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    budgetType: "fixed",
    workType: "online",
    location: "",
    skillsRequired: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        budget: Number(formData.budget),
        skillsRequired: formData.skillsRequired
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const response = await api.post("/jobs", payload);

      setSuccess(response.data.message || "Job posted successfully!");

      setFormData({
        title: "",
        description: "",
        category: "",
        budget: "",
        budgetType: "fixed",
        workType: "online",
        location: "",
        skillsRequired: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to post job. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100";

  const labelClass = "text-sm font-semibold text-gray-700";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-950"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="overflow-hidden rounded-2xl border border-yellow-200 bg-white shadow-sm">
          <div className="border-b border-yellow-100 bg-yellow-50 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-gray-950">
                <BriefcaseBusiness size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-extrabold text-gray-900">
                  Post a Job
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Describe the work and find the right talent.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700"
              >
                {success}
              </div>
            )}

            <div>
              <label htmlFor="title" className={labelClass}>
                Job title *
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Build a React landing page"
                minLength={3}
                maxLength={100}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>
                Job description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Explain the work, requirements, and expected result..."
                minLength={20}
                maxLength={3000}
                rows={5}
                required
                className={inputClass}
              />
              <p className="mt-1 text-xs text-gray-500">
                Minimum 20 characters.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className={labelClass}>
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Content Writing">Content Writing</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Data Entry">Data Entry</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="budget" className={labelClass}>
                  Budget (₹) *
                </label>
                <input
                  id="budget"
                  name="budget"
                  type="number"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  min="1"
                  step="0.01"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="budgetType" className={labelClass}>
                  Budget type *
                </label>
                <select
                  id="budgetType"
                  name="budgetType"
                  value={formData.budgetType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="fixed">Fixed price</option>
                  <option value="hourly">Hourly rate</option>
                </select>
              </div>

              <div>
                <label htmlFor="workType" className={labelClass}>
                  Work type *
                </label>
                <select
                  id="workType"
                  name="workType"
                  value={formData.workType}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="online">Online / Remote</option>
                  <option value="offline">Offline / On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            {formData.workType !== "online" && (
              <div>
                <label htmlFor="location" className={labelClass}>
                  Work location *
                </label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Kolkata, West Bengal"
                  maxLength={150}
                  required
                  className={inputClass}
                />
              </div>
            )}

            <div>
              <label htmlFor="skillsRequired" className={labelClass}>
                Required skills
              </label>
              <input
                id="skillsRequired"
                name="skillsRequired"
                value={formData.skillsRequired}
                onChange={handleChange}
                placeholder="React, JavaScript, Tailwind CSS"
                className={inputClass}
              />
              <p className="mt-1 text-xs text-gray-500">
                Separate skills with commas.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3.5 font-bold text-gray-950 transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin" size={19} />
                  Posting Job...
                </>
              ) : (
                "Publish Job"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
