"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: string;
}

export default function ProtectedRoute({
  children,
  allowedRole = "student",
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check role in localStorage
    const role = localStorage.getItem("role");

    // If not logged in or role doesn't match, redirect to /login
    if (!role || role.toLowerCase() !== allowedRole.toLowerCase()) {
      router.replace("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router, allowedRole]);

  // While checking auth status, render a clean loading spinner to avoid content flash
  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
          <p className="text-xs text-white/50">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export { ProtectedRoute };
