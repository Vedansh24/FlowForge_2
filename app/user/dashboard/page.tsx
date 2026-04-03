"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { isUser, getCurrentUser, getTasksByUser, TaskRecord } from "@/lib/auth";

export default function UserDashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isUser()) {
      router.replace("/login");
      return;
    }

    const currentUser = getCurrentUser();
    if (!currentUser) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const filteredTasks = getTasksByUser(currentUser.id);
    setTasks(filteredTasks);
    setLoading(false);
  }, [router]);

  const user = getCurrentUser();

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <DashboardLayout role="user">
      <section className="space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Welcome, {user?.firstName || user?.name || "User"}</h2>
            <p className="text-sm text-gray-500">Here are your assigned tasks</p>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <h3 className="mt-3 text-3xl font-semibold text-gray-800">{pendingTasks.length}</h3>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
            <p className="text-sm font-medium text-gray-500">In Progress</p>
            <h3 className="mt-3 text-3xl font-semibold text-gray-800">{inProgressTasks.length}</h3>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
            <p className="text-sm font-medium text-gray-500">Completed</p>
            <h3 className="mt-3 text-3xl font-semibold text-gray-800">{completedTasks.length}</h3>
          </div>
        </div>

        {loading ? (
          <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-600">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
            No tasks assigned yet
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-900">{task.projectTitle || task.project || "Untitled Project"}</h3>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{task.status}</span>
                </div>

                <p className="text-lg font-bold text-slate-800">{task.title}</p>

                {task.priority && (
                  <p className="mt-2 text-sm font-medium text-slate-500">Priority: {task.priority}</p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-slate-100 px-2 py-1">{task.company || user?.company || "(No company)"}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1">Assigned to you</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}
