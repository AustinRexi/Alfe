"use client";

import React, { useState } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Sidebar } from "../../components/layout/Sidebar";
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

export function Layout({
  children,
  currentPage,
  onNavigate,
  notifications,
  vendorName,
  vendorImage,
}: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      />

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <Sidebar
            currentPage={currentPage}
            onNavigate={onNavigate}
            isMobile
            onClose={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
