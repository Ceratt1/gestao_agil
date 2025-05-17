import { ChevronLeft, MoreVertical, LogOut } from 'lucide-react';

export default function TopNav({page}: {page: string}) {
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
          <a href="#" className="text-gray-700 hover:text-red-500">
            <LogOut className="w-5 h-5" />
          </a>
        </div>
      </nav>
    </div>
  );
}