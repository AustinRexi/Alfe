"use client";

import React from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Star,
  Wallet,
  User,
  HelpCircle,
  Settings as SettingsIcon,
} from "lucide-react";
import type { Page } from "@/provider/AppContext";

interface SidebarProps {
  currentPage: Page; // ← also change string → Page here
  onNavigate: (page: Page) => void; // ← and here
  onLogout?: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "products", label: "Products", icon: Package },
  { id: "special-orders", label: "Special Orders", icon: Star },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "profile", label: "Profile", icon: User },
  { id: "support", label: "Support", icon: HelpCircle },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

export default function Sidebar({
  currentPage,
  onNavigate,
  isMobile = false,
  onClose,
}: SidebarProps) {
  const handleClick = (id: Page) => {
    onNavigate(id);
    if (isMobile && onClose) onClose();
  };

  const sidebarClasses = isMobile
    ? "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl mt-16 overflow-y-auto"
    : "hidden lg:block w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] sticky top-16";

  const overlay = isMobile ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
      onClick={onClose}
    />
  ) : null;

  return (
    <>
      {overlay}
      <aside className={sidebarClasses}>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
