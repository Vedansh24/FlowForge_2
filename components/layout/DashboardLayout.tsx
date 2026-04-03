"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, LayoutDashboard, Briefcase } from "lucide-react";
import { logout, logoutSuperAdmin, isAuthenticated, isAuthenticatedSuperAdmin, isAdmin, isUser } from "@/lib/auth";
import { useEffect } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: "admin" | "user" | "superadmin";
}

export default function DashboardLayout({ children, role = "admin" }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isAdminRole = role === "admin";
  const isUserRole = role === "user";
  const isSuperAdminRole = role === "superadmin";

  const navItems = isSuperAdminRole
    ? [
        { href: "/superadmin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/superadmin/companies", label: "Companies", icon: Briefcase },
      ]
    : isAdminRole
      ? [
          { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { href: "/admin/projects", label: "Projects", icon: Briefcase },
          { href: "/admin/users", label: "Users", icon: Users },
        ]
      : [
          { href: "/user/dashboard", label: "My Tasks", icon: Home },
        ];

  useEffect(() => {
    if (isSuperAdminRole && !isAuthenticatedSuperAdmin()) {
      router.push("/superadmin/login");
    } else if ((isAdminRole || isUserRole) && !isAuthenticated()) {
      router.push("/login");
    }
  }, [router, isSuperAdminRole, isAdminRole, isUserRole]);

  const onLogout = () => {
    if (isSuperAdminRole) {
      logoutSuperAdmin();
      router.push("/superadmin/login");
    } else {
      logout();
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-[260px_1fr] lg:p-8">
        <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="mb-8 text-center">
            <h1 className="text-xl font-bold text-slate-900">FlowForge</h1>
            <p className="text-xs text-slate-500">
              {isSuperAdminRole ? "Super Admin" : isAdminRole ? "Admin Portal" : "Employee Portal"}
            </p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={onLogout}
            className="mt-6 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100"
          >
            Logout
          </button>
        </aside>

        <main className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
          {children}
        </main>
      </div>
    </div>
  );
}
