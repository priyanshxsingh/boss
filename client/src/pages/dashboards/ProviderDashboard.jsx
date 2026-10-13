
import {
  PlusCircle,
  BriefcaseBusiness,
  Users,
  ClipboardList,
  Search,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Post a Job",
    description: "Publish a job or work opportunity for Hunters.",
    icon: PlusCircle,
    action: "/dashboard/post-job",
  },
  {
    title: "Manage My Jobs",
    description: "View, edit, and manage the jobs you've posted.",
    icon: BriefcaseBusiness,
    action: "/dashboard/manage-jobs",
  },
  {
    title: "Review Applicants",
    description: "Review applications from Hunters and find the right person.",
    icon: Users,
  },
  {
    title: "Hire a Hunter",
    description: "Select suitable candidates for your available work.",
    icon: ClipboardList,
  },
  {
    title: "Find Service Providers",
    description: "Explore available services offered on BOSS.",
    icon: Search,
  },
  {
    title: "My Profile",
    description: "Manage your details and the services or work you provide.",
    icon: UserRound,
  },
];

export default function ProviderDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600">
          Service Provider Workspace
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Find talent. Get work done.
        </h1>

        <p className="mt-2 text-gray-600">
          Publish opportunities, review applicants, and hire the right people
          through BOSS.
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
                if (feature.action) {
                  navigate(feature.action);
                }
              }}
              disabled={!feature.action}
              className={`rounded-2xl border border-yellow-100 bg-white p-6 text-left shadow-sm transition ${
                feature.action
                  ? "cursor-pointer hover:-translate-y-1 hover:border-yellow-300 hover:shadow-md"
                  : "cursor-not-allowed opacity-80"
              }`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                <Icon size={24} />
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>
            </button>
          );
        })}
      </section>

      <section className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Ready to hire?
        </h2>

        <p className="mt-2 text-sm text-gray-700">
          Start by posting a job. We'll connect your workspace to MongoDB so
          you can publish opportunities, receive applications, and hire
          Hunters.
        </p>
      </section>
    </div>
  );
}
