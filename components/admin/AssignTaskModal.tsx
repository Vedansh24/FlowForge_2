"use client";

import { useState, useEffect } from "react";
import { assignTask, getCurrentUser, getProjectsByCompany, getUsersByCompany } from "@/lib/auth";
import { User } from "./UserTable";

interface ProjectOption {
  id: string;
  title: string;
}

interface AssignTaskModalProps {
  selectedUserId?: string;
  selectedUserName?: string;
  users: User[];
  onAssign: (success: boolean) => void;
  onClose: () => void;
}

export default function AssignTaskModal({
  selectedUserId,
  selectedUserName,
  users,
  onAssign,
  onClose,
}: AssignTaskModalProps) {
  const [selectedUser, setSelectedUser] = useState<string>(selectedUserId || "");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskStatus, setTaskStatus] = useState<"pending" | "in-progress">("pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [projects, setProjects] = useState<ProjectOption[]>([]);

  const [companyUsers, setCompanyUsers] = useState<User[]>(users);

  // Load projects and users in current company on mount
  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      setProjects([]);
      setCompanyUsers([]);
      return;
    }

    try {
      const companyProjects = getProjectsByCompany(currentUser.company);
      const projectOptions = companyProjects.map((p) => ({ id: p.id, title: p.title }));
      setProjects(projectOptions);

      const usersForCompany = getUsersByCompany(currentUser.company).map((u) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        role: u.role,
        company: u.company,
      }));
      setCompanyUsers(usersForCompany);
    } catch (err) {
      console.error("Failed to load projects or users:", err);
      setProjects([]);
      setCompanyUsers([]);
    }
  }, [users]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedUser || !selectedProject) {
      setError("Please select both a user and a project.");
      return;
    }

    if (!taskTitle.trim()) {
      setError("Task title is required.");
      return;
    }

    setLoading(true);

    try {
      const result = await assignTask({
        title: taskTitle.trim(),
        assignedTo: selectedUser,
        projectId: selectedProject,
        status: taskStatus,
      });

      if (result.success) {
        onAssign(true);
        setSelectedUser(selectedUserId || "");
        setSelectedProject("");
        setTaskTitle("");
        setTaskStatus("pending");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md transform rounded-xl bg-white p-6 shadow-xl transition-all duration-200 ease-out hover:scale-[1.01]">
        <h3 className="text-lg font-semibold text-slate-900">Assign Task</h3>
        <p className="mt-1 text-sm text-slate-600">
          {selectedUserName ? `Assign task to ${selectedUserName}` : "Assign a task to a team member."}
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-2 text-xs text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700">User*</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              disabled={!!selectedUserId}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 disabled:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Choose a user...</option>
              {companyUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.role === "admin" ? "Admin" : "Employee"})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Project*</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="">
                {projects.length === 0 ? "No projects available" : "Choose a project..."}
              </option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Task Title*</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Status</label>
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value as "pending" | "in-progress")}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Assigning..." : "Assign"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
