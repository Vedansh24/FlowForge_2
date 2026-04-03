"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl">        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block text-2xl font-bold text-slate-900 hover:text-slate-700">
            FlowForge
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">Create Your Account</h1>
          <p className="mt-2 text-slate-600">Join thousands of teams managing projects seamlessly</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <SignupForm onSuccess={handleSuccess} />
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          By signing up, you agree to our{" "}
          <a href="#" className="text-slate-700 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-slate-700 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
