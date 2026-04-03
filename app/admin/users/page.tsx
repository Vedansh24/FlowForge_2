"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserTable from "@/components/admin/UserTable";
import AssignTaskModal from "@/components/admin/AssignTaskModal";
import { isAdmin, getCurrentUser, getUsersByCompany, getAllUsers, getAllTasks } from "@/lib/auth";
import { User } from "@/components/admin/UserTable";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedUserName, setSelectedUserName] = useState<string>("");
  const router = useRouter();

  const loadUsers = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      setUsers([]);
      return;
    }

    const storedUsers = getUsersByCompany(currentUser.company);
    const transformedUsers: User[] = storedUsers.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      company: user.company,
    }));
    setUsers(transformedUsers);

    // Load tasks for this company
    const storedTasks = getAllTasks().filter(t => t.company === currentUser.company);
    setTasks(storedTasks);
  };

  useEffect(() => {
    if (!isAdmin()) {
      router.replace("/login");
      return;
    }

    loadUsers();

    const onStorage = (event: StorageEvent) => {
      if (event.key === "flowforge_users") {
        loadUsers();
      }
      if (event.key === "flowforge_tasks") {
        const currentUser = getCurrentUser();
        if (currentUser) {
          const updatedTasks = getAllTasks().filter(t => t.company === currentUser.company);
          setTasks(updatedTasks);
        }
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [router]);

  // Filter users into admins and employees
  const admins = users.filter((u) => u.role === "admin");
  const employees = users.filter((u) => u.role === "user");

  const handleAssignTask = (userId: string, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setShowAssignModal(true);
  };

  const handleRemoveUser = (userId: string) => {
    if (!confirm("Remove this user?")) {
      return;
    }
    const remaining = users.filter((u) => u.id !== userId);
    setUsers(remaining);
    if (typeof window !== "undefined") {
      const rawUsers = getAllUsers().filter((u) => u.id !== userId);
      localStorage.setItem("flowforge_users", JSON.stringify(rawUsers));
    }
  };

  const handleAssignConfirm = (success: boolean) => {
    if (success) {
      setShowAssignModal(false);
      setSelectedUserId("");
      setSelectedUserName("");
    }
  };

  return (
    <DashboardLayout role="admin">
      <section className="space-y-8">
        <header className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Team Management</h2>
          <p className="text-sm text-gray-500">Manage admins, employees, and task assignments.</p>
        </header>

        {/* Admins Section */}
        <div>
          <UserTable
            users={admins}
            title={`Company Admins (${admins.length})`}
            onAssignTask={handleAssignTask}
            onRemoveUser={handleRemoveUser}
            tasks={tasks}
          />
        </div>

        {/* Employees Section */}
        <div>
          <UserTable
            users={employees}
            title={`Company Employees (${employees.length})`}
            onAssignTask={handleAssignTask}
            onRemoveUser={handleRemoveUser}
            tasks={tasks}
          />
        </div>

        {/* Assign Task Modal - Loads projects from localStorage */}
        {showAssignModal && (
          <AssignTaskModal
            selectedUserId={selectedUserId}
            selectedUserName={selectedUserName}
            users={users}
            onAssign={handleAssignConfirm}
            onClose={() => {
              setShowAssignModal(false);
              setSelectedUserId("");
              setSelectedUserName("");
            }}
          />
        )}
      </section>
    </DashboardLayout>
  );
}
