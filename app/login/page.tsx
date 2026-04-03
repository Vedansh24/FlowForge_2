"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(email.trim(), password.trim());
      
      // Route based on role
      if (response.role === "admin") {
        router.push("/admin/dashboard");
      } else if (response.role === "user") {
        router.push("/user/dashboard");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">FlowForge Login</h1>
        <p className="mt-2 text-sm text-gray-500">Sign in to your account</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              required
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 disabled:bg-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
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
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 disabled:bg-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          {error ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition disabled:bg-slate-500 hover:bg-slate-700"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 border-t border-slate-200 pt-6">
          <p className="text-xs font-medium text-slate-500 mb-3 uppercase">Getting Started</p>
          <div className="space-y-2">
            <Link
              href="/signup"
              className="block w-full rounded-lg border border-slate-300 px-4 py-2 text-xs text-slate-700 transition hover:bg-slate-100 text-center"
            >
              Sign up as Employee
            </Link>
            <Link
              href="/signup/admin"
              className="block w-full rounded-lg border border-slate-300 px-4 py-2 text-xs text-slate-700 transition hover:bg-slate-100 text-center"
            >
              Sign up as Admin
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-slate-900 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
