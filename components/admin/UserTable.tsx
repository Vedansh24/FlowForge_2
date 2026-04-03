export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
}

interface UserTableProps {
  users: User[];
  title: string;
  onAssignTask: (userId: string, userName: string) => void;
  onRemoveUser: (userId: string) => void;
  tasks: any[];
}

export default function UserTable({ users, title, onAssignTask, onRemoveUser, tasks }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">No {title.toLowerCase()} found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="px-4 py-3">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total: {users.length}</p>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">
                  Company
                </th>
                <th className="px-4 py-3 text-center text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {users.map((user) => {
                const userTasks = tasks.filter(t => t.assignedTo === user.id);
                const status = userTasks.length === 0 ? "Free" : "Working";

                return (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`text-xs px-2 py-1 rounded ${
                        user.role === "admin"
                          ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="space-y-1">
                        <span className={`inline-block text-xs px-2 py-0.5 rounded ${
                          status === "Free"
                            ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            : "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                        }`}>
                          {status}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Tasks: {userTasks.length}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                      {user.company}
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => onAssignTask(user.id, user.name)}
                          className="text-sm px-3 py-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-150"
                        >
                          Assign
                        </button>
                        <button
                          onClick={() => onRemoveUser(user.id)}
                          className="text-sm px-3 py-1.5 rounded border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
