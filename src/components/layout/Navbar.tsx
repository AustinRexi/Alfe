"use client";

import { useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import Image from "next/image";
import { Notification } from "@/types/app";
interface NavbarProps {
  vendorName: string;
  vendorImage?: string;
  notifications: Notification[];
  onNavigate: (page: string) => void;
  onMobileMenuToggle: () => void;
  mobileMenuOpen: boolean;
}

export default function Navbar({
  vendorName,
  vendorImage,
  notifications,
  onNavigate,
  onMobileMenuToggle,
  mobileMenuOpen,
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-lg">
                <span className="text-xl">OneFit</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">Vendors</span>
            </div>
          </div>

          {/* Right side - Notifications & Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Bell size={20} className="text-slate-700" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
                  <div className="p-4 border-b border-slate-200">
                    <h3 className="text-slate-900 font-medium">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-sm text-slate-500 text-center">
                        No notifications
                      </p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${
                            !notif.read ? "bg-blue-50" : ""
                          }`}
                        >
                          <p className="text-sm text-slate-900">
                            {notif.message}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {notif.time}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 text-center border-t border-slate-200">
                    <button className="text-sm text-blue-900 hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm text-slate-900 font-medium">
                  {vendorName}
                </p>
              </div>
              <button
                onClick={() => onNavigate("profile")}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-900 to-blue-700 text-white flex items-center justify-center overflow-hidden text-lg font-semibold"
              >
                {vendorImage ? (
                  <Image
                    src={vendorImage}
                    alt={vendorName}
                    className="w-full h-full object-cover"
                    width={40}
                    height={40}
                  />
                ) : (
                  <span>{vendorName.charAt(0).toUpperCase()}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
