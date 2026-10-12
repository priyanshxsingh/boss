
import { LogOut, UserRound, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import ProviderDashboard from "./dashboards/ProviderDashboard";
import HunterDashboard from "./dashboards/HunterDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const role = user?.role;

  const dashboardContent = {
    provider: <ProviderDashboard />,
    hunter: <HunterDashboard />,
    admin: <AdminDashboard />,
  };

  const roleLabel = {
    provider: "Provider",
    hunter: "Hunter",
    admin: "Administrator",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b border-yellow-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-gray-950">
              <LayoutDashboard size={22} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                BOSS
              </h1>
              <p className="text-xs text-gray-500">
                Bridge Of Skill & Service
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-yellow-400 hover:bg-yellow-50"
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 flex flex-col gap-4 rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Welcome back
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Hello, {user?.name || "User"}!
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Here's your BOSS workspace.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-xl bg-yellow-50 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-200 text-yellow-800">
              <UserRound size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500">Your role</p>
              <p className="font-semibold text-gray-900">
                {roleLabel[role] || "User"}
              </p>
            </div>
          </div>
        </section>

        {dashboardContent[role] || (
          <section className="rounded-2xl border border-yellow-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Dashboard unavailable
            </h2>
            <p className="mt-2 text-gray-600">
              Your account doesn't have a recognized dashboard role.
              Please contact the administrator.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
