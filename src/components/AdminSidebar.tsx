"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, FileText, User, LogOut, Menu, X, 
  Settings, ChevronRight 
} from "lucide-react";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSidebar() {
  // Admin UI has been removed — render nothing.
  return null;
}

// Helper Components
function NavLinks({ items, pathname, close }: { items: any[], pathname: string, close?: () => void }) {
  return (
    <nav className="space-y-2">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href} 
            href={item.href}
            onClick={close}
            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
              ${isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </div>
            {isActive && <ChevronRight size={16} />}
          </Link>
        );
      })}
    </nav>
  );
}

function LogoutButton() {
  return (
    <button 
      onClick={() => signOut()}
      className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white py-3 rounded-xl transition-all duration-300 font-bold text-sm group"
    >
      <LogOut size={16} className="group-hover:-translate-x-1 transition-transform"/>
      Sign Out
    </button>
  );
}