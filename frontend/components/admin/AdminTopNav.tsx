import { useState } from "react";
import { ChevronLeft, MoreVertical, LogOut } from 'lucide-react';

export default function TopNav({ page }: { page: string }) {
  const [loadingLogout, setLoadingLogout] = useState(false);

  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Token ${token}` } : {}),
        },
      });
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("is_staff");
      localStorage.removeItem("is_superuser");
      localStorage.removeItem("user");
      setLoadingLogout(false);
      window.location.href = "/dashboard/login";
    } catch {
      setLoadingLogout(false);
      alert("Erro ao fazer logout.");
    }
  };

  return (
    <div className="w-full bg-white shadow">
      <nav className="flex items-center justify-between px-4 py-2">
        <button id="sidebarCollapse" className="hidden md:block">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-lg font-semibold text-black">{page}</span>

        <div className="flex items-center space-x-4">
          <button className="md:hidden">
            <MoreVertical className="w-5 h-5" />
          </button>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-500"
            disabled={loadingLogout}
            title="Sair"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </div>
  );
}