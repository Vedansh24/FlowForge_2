export interface Project {
  id: string;
  title: string;
  description: string;
  assignedUser: string;
  status: "new" | "ongoing" | "completed";
  dueDate: string;
  priority?: "low" | "medium" | "high";
  startDate?: string;
  tags?: string[];
}

interface ProjectCardProps {
  project: Project;
  onMove: (projectId: string, newStatus: "new" | "ongoing" | "completed") => void;
  tasks: any[];
  users: any[];
}

const priorityColor = (priority?: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-700 border-green-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

export default function ProjectCard({ project, onMove, tasks, users }: ProjectCardProps) {
  // Find the task for this project
  const task = tasks.find(t => t.projectId === project.id);
  // Find the assigned user
  const assignedUser = users.find(u => u.id === project.assignedUser);
  const userName = assignedUser ? `${assignedUser.firstName} ${assignedUser.lastName}` : project.assignedUser;

  // Get all tasks for this project
  const projectTasks = tasks.filter(t => t.projectId === project.id);
  // Get unique assigned user IDs
  const assignedUserIds = [...new Set(projectTasks.map(t => t.assignedTo))];
  // Get user details
  const assignedUsers = users.filter(u => assignedUserIds.includes(u.id));
  // Format names for display
  const assignedNames = assignedUsers.map(u => `${u.firstName} ${u.lastName}`);
  const displayNames = assignedNames.length > 2 
    ? `${assignedNames.slice(0, 2).join(', ')} +${assignedNames.length - 2} more`
    : assignedNames.join(', ');

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900">{project.title}</h4>
          <p className="mt-1 text-xs text-slate-600">{project.description}</p>
        </div>
        {project.priority && (
          <span
            className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${priorityColor(
              project.priority
            )}`}
          >
            {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
          </span>
        )}
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Assigned to: <span className="font-medium text-slate-700">{userName}</span>
      </p>
      {task && (
        <p className="text-xs text-slate-500">
          Task Status: <span className="font-medium text-slate-700">{task.status.replace('-', ' ')}</span>
        </p>
      )}
      
      {/* Team Assignment Section */}
      {projectTasks.length > 0 && (
        <div className="mt-2 p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-slate-600">
            <span className="font-medium">{assignedUsers.length}</span> team member{assignedUsers.length !== 1 ? 's' : ''} working
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Tasks: <span className="font-medium">{projectTasks.length}</span>
          </p>
          {assignedNames.length > 0 && (
            <p className="text-xs text-slate-500 mt-1 truncate">
              {displayNames}
            </p>
          )}
        </div>
      )}
      
      <p className="text-xs text-slate-500">Due: {project.dueDate}</p>

      {project.tags && project.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700 border border-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex gap-2">
        {project.status !== "new" && (
          <button
            onClick={() => onMove(project.id, "new")}
            className="text-xs rounded border border-slate-300 px-2 py-1 text-slate-600 hover:bg-slate-50"
          >
            New
          </button>
        )}
        {project.status !== "ongoing" && (
          <button
            onClick={() => onMove(project.id, "ongoing")}
            className="text-xs rounded border border-slate-300 px-2 py-1 text-slate-600 hover:bg-slate-50"
          >
            Ongoing
          </button>
        )}
        {project.status !== "completed" && (
          <button
            onClick={() => onMove(project.id, "completed")}
            className="text-xs rounded border border-slate-300 px-2 py-1 text-slate-600 hover:bg-slate-50"
          >
            Completed
          </button>
        )}
      </div>
    </div>
  );
}
