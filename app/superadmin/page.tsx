"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function SuperAdminPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/superadmin/dashboard");
    } else {
      router.replace("/superadmin/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-slate-600">Redirecting...</p>
    </div>
  );
}
