"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { isAdmin } from "@/lib/auth";
import StatsCard from "@/components/superadmin/StatsCard";

const stats = [
  { label: "Total Projects", value: 12, colorClass: "bg-blue-50" },
  { label: "Total Users", value: 8, colorClass: "bg-cyan-50" },
  { label: "Active Tasks", value: 24, colorClass: "bg-emerald-50" },
];

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin()) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <DashboardLayout role="admin">
      <section className="space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
          <p className="text-sm text-gray-500">Manage projects, users, and tasks.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-xl bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
              <StatsCard key={item.label} label={item.label} value={item.value} colorClass={item.colorClass} />
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
          <h3 className="text-lg font-semibold text-slate-900">Overview</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Manage your company's projects, team members, and tasks. Use the sidebar to navigate to Projects or Users management.
          </p>
        </div>
      </section>
    </DashboardLayout>
  );
}
