"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isUser } from "@/lib/auth";

export default function UserRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    if (isUser()) {
      router.replace("/user/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
}
