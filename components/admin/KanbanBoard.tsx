"use client";

import { Project } from "./ProjectCard";
import ProjectCard from "./ProjectCard";

interface KanbanBoardProps {
  projects: Project[];
  onMove: (projectId: string, newStatus: "new" | "ongoing" | "completed") => void;
  tasks: any[];
  users: any[];
}

export default function KanbanBoard({ projects, onMove, tasks, users }: KanbanBoardProps) {
  const columns = {
    new: projects.filter((p) => p.status === "new"),
    ongoing: projects.filter((p) => p.status === "ongoing"),
    completed: projects.filter((p) => p.status === "completed"),
  };

  return (
    <div className="grid gap-4 overflow-x-auto md:grid-cols-3">
      {/* New Projects */}
      <div className="min-w-[300px] rounded-xl border border-gray-200 bg-indigo-50 p-4 shadow-sm">
        <h3 className="font-semibold text-slate-900">New Projects ({columns.new.length})</h3>
        <div className="mt-3 space-y-3">
          {columns.new.map((project) => (
            <ProjectCard key={project.id} project={project} onMove={onMove} tasks={tasks} users={users} />
          ))}
        </div>
      </div>

      {/* Ongoing */}
      <div className="min-w-[300px] rounded-xl border border-gray-200 bg-yellow-50 p-4 shadow-sm">
        <h3 className="font-semibold text-yellow-700">Ongoing ({columns.ongoing.length})</h3>
        <div className="mt-3 space-y-3">
          {columns.ongoing.map((project) => (
            <ProjectCard key={project.id} project={project} onMove={onMove} tasks={tasks} users={users} />
          ))}
        </div>
      </div>

      {/* Completed */}
      <div className="min-w-[300px] rounded-xl border border-gray-200 bg-emerald-50 p-4 shadow-sm">
        <h3 className="font-semibold text-emerald-700">Completed ({columns.completed.length})</h3>
        <div className="mt-3 space-y-3">
          {columns.completed.map((project) => (
            <ProjectCard key={project.id} project={project} onMove={onMove} tasks={tasks} users={users} />
          ))}
        </div>
      </div>
    </div>
  );
}
