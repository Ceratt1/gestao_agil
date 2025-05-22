import { useEffect } from "react";
import { useRouter } from "next/router";

export default function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!(user.is_staff || user.regra === "ADMIN")) {
      router.replace("/dashboard/login");
    }
  }, [router]);

  return <>{children}</>;
}