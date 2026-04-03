"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginSuperAdmin } from "@/lib/auth";

export default function SuperAdminLoginPage() {
  const [email, setEmail] = useState("super@admin.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await loginSuperAdmin(email.trim(), password.trim());
      router.push("/superadmin/dashboard");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-slate-900">Super Admin Login</h1>
          <p className="mt-2 text-slate-600">Login with your super admin credentials.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>

            {error ? (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
