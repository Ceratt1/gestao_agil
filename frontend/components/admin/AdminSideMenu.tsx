"use client"

import {LayoutDashboard, Grid, Home} from 'lucide-react';
import Link from 'next/link';

export default function SidebarMenu() {
  return (
    <nav className="w-64 bg-black text-white h-screen">
      <div className="p-4 border-b border-gray-700">
        <h3 className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
          {/* <img src="/logo.png" alt="Logo" className="h-8" /> */}
          <span className="text-lg font-semibold">ATR Mundial</span>
        </h3>
      </div>
      <ul className="p-4 space-y-2">
         <li>
          <Link href="/" className="flex items-center p-2 space-x-2 hover:bg-gray-700 rounded">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
        </li>
        <li className="bg-gray-800 rounded">
          <Link href="/dashboard" className="flex items-center p-2 space-x-2 hover:bg-gray-700 rounded">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <details className="group">
            <summary className="flex items-center p-2 space-x-2 hover:bg-gray-700 rounded cursor-pointer">
              <Grid className="w-5 h-5" />
              <span>Tabelas</span>
            </summary>
            <ul className="ml-6 mt-2 space-y-1">
              
                
              <li><Link href="/dashboard/produtos" className="block px-2 py-1 hover:text-gray-300">Produtos</Link></li>
            
              <li><Link href="/dashboard/usuarios" className="block px-2 py-1 hover:text-gray-300">Usuarios</Link></li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  );
}
