import {
  Search,
  BriefcaseBusiness,
  ClipboardList,
  UserRound,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Browse Jobs",
    description: "Explore work opportunities posted by Service Providers.",
    icon: Search,
    action: "/dashboard/browse-jobs",
  },
  {
    title: "Find Services",
    description: "Discover services and opportunities that match your skills.",
    icon: BriefcaseBusiness,
  },
  {
    title: "My Applications",
    description: "Track applications and check whether you've been selected.",
    icon: ClipboardList,
    action: "/dashboard/my-applications",
  },
  {
    title: "My Work",
    description: "View jobs you've been hired to complete.",
    icon: Clock,
    action: "/dashboard/my-work",
  },
  {
    title: "My Profile",
    description: "Showcase your skills, experience, and qualifications.",
    icon: UserRound,
  },
];

export default function HunterDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-bold uppercase tracking-widest text-yellow-700">
          Job Hunter Workspace
        </p>

        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Find opportunities.
          <span className="block text-yellow-600">Get hired.</span>
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-gray-600">
          Discover jobs, put your skills to work, and track your journey toward
          getting hired with BOSS.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <button
              key={feature.title}
              type="button"
              onClick={() => {
                console.log("Clicked:", feature.title, feature.action);

                if (feature.action) {
                  navigate(feature.action);
                }
              }}
              className="group rounded-2xl border border-yellow-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-yellow-300 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700 transition group-hover:bg-yellow-400">
                <Icon size={24} />
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>

              {feature.action && (
                <p className="mt-4 text-sm font-bold text-yellow-700">
                  Explore jobs →
                </p>
              )}
            </button>
          );
        })}
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-yellow-200 bg-yellow-50 p-6 sm:p-8">
        <div className="relative">
          <h2 className="text-xl font-extrabold text-gray-900">
            Your next opportunity awaits.
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-700">
            Explore available work and find opportunities that match your
            interests and skills.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/browse-jobs")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-yellow-400 hover:text-gray-950"
          >
            <Search size={17} />
            Browse available jobs
            <ArrowUpRight size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}
