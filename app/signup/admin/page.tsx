"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminSignupForm from "@/components/auth/AdminSignupForm";

export default function AdminSignupPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">        <div className="mb-8 text-center">
          <Link href="/" className="inline-block text-2xl font-bold text-slate-900 hover:text-slate-700">
            FlowForge
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">Admin Signup - Launch Your Company</h1>
          <p className="mt-2 text-slate-600">Create your company and connect your first admin account in one step.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <AdminSignupForm onSuccess={handleSuccess} />
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          By signing up, you agree to our{' '}
          <a href="#" className="text-slate-700 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-slate-700 hover:underline">
            Privacy Policy
          </a>
        </p>

        <p className="mt-4 text-center text-sm text-slate-600">
          Looking to join a company?{' '}
          <Link href="/signup" className="font-medium text-slate-900 hover:underline">
            Sign up as employee
          </Link>
        </p>
      </div>
    </div>
  );
}
