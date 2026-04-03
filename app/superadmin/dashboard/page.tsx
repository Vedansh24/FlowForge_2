"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/superadmin/StatsCard";
import { isAuthenticated } from "@/lib/auth";

const stats = [
  { label: "Total Companies", value: 24, colorClass: "bg-blue-50" },
  { label: "Total Users", value: 1322, colorClass: "bg-cyan-50" },
  { label: "Active Projects", value: 57, colorClass: "bg-emerald-50" },
];

export default function SuperAdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/superadmin/login");
    }
  }, [router]);

  return (
    <DashboardLayout>
      <section className="space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Super Admin Dashboard</h2>
          <p className="text-sm text-slate-600">Manage companies, users, and projects.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <StatsCard key={item.label} label={item.label} value={item.value} colorClass={item.colorClass} />
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Overview</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            This is a super admin dashboard with quick visibility into companies and platform usage.
          </p>
        </div>
      </section>
    </DashboardLayout>
  );
}
