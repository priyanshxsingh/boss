
import {
  Users,
  BriefcaseBusiness,
  ShieldCheck,
  ChartNoAxesCombined,
} from "lucide-react";

const features = [
  {
    title: "Manage Users",
    description: "View users and manage account status.",
    icon: Users,
  },
  {
    title: "Manage Listings",
    description: "Monitor jobs and services published on BOSS.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Platform Security",
    description: "Review platform access and account permissions.",
    icon: ShieldCheck,
  },
  {
    title: "Platform Overview",
    description: "Monitor marketplace activity and platform growth.",
    icon: ChartNoAxesCombined,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600">
          Administration
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Manage the BOSS marketplace.
        </h1>

        <p className="mt-2 text-gray-600">
          Oversee users, listings, and platform activity from one workspace.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
          Platform control center
        </h2>

        <p className="mt-2 text-sm text-gray-700">
          These are dashboard placeholders. We'll connect the management
          features to protected backend APIs as the platform develops.
        </p>
      </section>
    </div>
  );
}
