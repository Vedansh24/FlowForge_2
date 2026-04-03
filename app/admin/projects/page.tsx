"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import KanbanBoard from "@/components/admin/KanbanBoard";
import CreateProjectModal from "@/components/admin/CreateProjectModal";
import { isAdmin, getCurrentUser, getProjectsByCompany, updateProjectStatus, ProjectRecord, getAllTasks, getUsersByCompany } from "@/lib/auth";
import { Project } from "@/components/admin/ProjectCard";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin()) {
      router.replace("/login");
      return;
    }

    const currentUser = getCurrentUser();
    if (!currentUser) {
      setProjects([]);
      return;
    }

    // Load projects only for this company
    const storedProjects = getProjectsByCompany(currentUser.company);
    const convertedProjects: Project[] = storedProjects.map((p: ProjectRecord) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      assignedUser: p.assignedTo,
      status: p.status,
      dueDate: p.dueDate,
      priority: p.priority,
      startDate: p.startDate,
      tags: p.tags,
    }));
    setProjects(convertedProjects);

    // Load tasks and users for this company
    const storedTasks = getAllTasks().filter(t => t.company === currentUser.company);
    setTasks(storedTasks);
    const storedUsers = getUsersByCompany(currentUser.company);
    setUsers(storedUsers);

    // Listen for storage changes to sync across tabs
    const handleStorageChange = () => {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        setProjects([]);
        return;
      }

      const updated = getProjectsByCompany(currentUser.company);
      const converted: Project[] = updated.map((p: ProjectRecord) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        assignedUser: p.assignedTo,
        status: p.status,
        dueDate: p.dueDate,
        priority: p.priority,
        startDate: p.startDate,
        tags: p.tags,
      }));
      setProjects(converted);

      // Reload tasks and users
      const updatedTasks = getAllTasks().filter(t => t.company === currentUser.company);
      setTasks(updatedTasks);
      const updatedUsers = getUsersByCompany(currentUser.company);
      setUsers(updatedUsers);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [router]);

  const handleMoveProject = (projectId: string, newStatus: "new" | "ongoing" | "completed") => {
    // Update in localStorage
    updateProjectStatus(projectId, newStatus);

    // Update in local state
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, status: newStatus } : p))
    );
  };

  const handleProjectCreated = (project: ProjectRecord) => {
    if (!project) return;

    setProjects((prev) => [
      ...prev,
      {
        id: project.id,
        title: project.title,
        description: project.description,
        assignedUser: project.assignedTo,
        status: project.status,
        dueDate: project.dueDate,
        priority: project.priority,
        startDate: project.startDate,
        tags: project.tags,
      },
    ]);
  };

  return (
    <DashboardLayout role="admin">
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
            <p className="text-sm text-gray-500">Drag projects through the pipeline.</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700"
          >
            + Create Project
          </button>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
          <KanbanBoard projects={projects} onMove={handleMoveProject} tasks={tasks} users={users} />
        </div>

        <CreateProjectModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onProjectCreated={handleProjectCreated}
        />
      </section>
    </DashboardLayout>
  );
}
