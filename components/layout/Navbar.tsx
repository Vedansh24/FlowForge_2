import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="text-2xl font-bold tracking-tight text-gray-800">
          FlowForge
        </div>
        <nav className="flex gap-3">
          <Link
            href="/signup"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Sign Up
          </Link>
          <Link
            href="/signup/admin"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Admin Sign Up
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </Link>
          <Link
            href="/superadmin/login"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700"
          >
            Super Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
