// src/components/layout/AppLayout.tsx
"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Notification } from "@/types/app";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout?: () => void;
  notifications: Notification[];
  vendorName: string;
  vendorImage?: string;
}

// EXPORT AS DEFAULT — THIS IS CRITICAL!
export default function AppLayout({
  children,
  currentPage,
  onNavigate,
  onLogout,
  notifications,
  vendorName,
  vendorImage,
}: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout?.();
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <Navbar
        vendorName={vendorName}
        vendorImage={vendorImage}
        notifications={notifications}
        onNavigate={onNavigate}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onLogout={handleLogout}
      />

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            currentPage={currentPage}
            onNavigate={onNavigate}
            onLogout={handleLogout}
          />
        </div>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative flex flex-col w-64 bg-white">
              <Sidebar
                currentPage={currentPage}
                onNavigate={(page) => {
                  onNavigate(page);
                  setMobileMenuOpen(false);
                }}
                onLogout={handleLogout}
                isMobile
                onClose={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
