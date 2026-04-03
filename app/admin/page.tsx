"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticatedAdmin } from "@/lib/auth";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticatedAdmin()) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-slate-600">Redirecting...</p>
    </div>
  );
}
