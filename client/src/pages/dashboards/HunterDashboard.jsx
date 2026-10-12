
import {
  Search,
  BriefcaseBusiness,
  ClipboardList,
  UserRound,
  Clock,
} from "lucide-react";

const features = [
  {
    title: "Browse Jobs",
    description: "Explore work opportunities posted by Service Providers.",
    icon: Search,
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
  },
  {
    title: "My Work",
    description: "View jobs you've been hired to complete.",
    icon: Clock,
  },
  {
    title: "My Profile",
    description: "Showcase your skills, experience, and qualifications.",
    icon: UserRound,
  },
];

export default function HunterDashboard() {
  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600">
          Job Hunter Workspace
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Find opportunities. Get hired.
        </h1>

        <p className="mt-2 text-gray-600">
          Discover jobs, apply using your skills, and track your journey
          toward getting hired with BOSS.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-2xl border border-yellow-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
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
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Your next opportunity awaits.
        </h2>

        <p className="mt-2 text-sm text-gray-700">
          Start by exploring available work. We'll connect these sections
          to real jobs, applications, and hiring updates from MongoDB.
        </p>
      </section>
    </div>
  );
}
