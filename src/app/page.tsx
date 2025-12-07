// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/provider/AppContext";
import SplashScreen from "@/app/splashscreen/page";
import Login from "@/app/login/page";
import { Layout } from "@/app/layout/page";

// Import all pages
import Dashboard from "@/app/dashboard/page";
import Orders from "@/app/orders/page";
import Products from "@/app/products/page";
import SpecialOrders from "@/app/specialorders/page";
import Wallet from "@/app/wallet/page";
import Profile from "@/app/profile/page";
import Support from "@/app/support/page";
import Settings from "@/app/settings/page";

export default function Home() {
  const {
    isAuthenticated,
    currentPage,
    setCurrentPage,
    vendorProfile,
    notifications,
    logout,
    setVendorProfile,
  } = useApp();

  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // === BEST SPLASH SCREEN EXPERIENCE ===
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (hasSeenSplash) {
      // Skip splash on refresh/revisit
      setShowSplash(false);
      setIsLoading(false);
    } else {
      // Show splash once per session
      const timer = setTimeout(() => {
        setShowSplash(false);
        setIsLoading(false);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 5000); // Matches your beautiful animation

      return () => clearTimeout(timer);
    }
  }, []);

  // === AUTO LOGIN ON REFRESH ===
  useEffect(() => {
    const session = localStorage.getItem("vendorSession");
    if (session && !isAuthenticated) {
      // Trigger context reload without full page reload
      window.dispatchEvent(new Event("storage"));
    }
  }, [isAuthenticated]);

  // === FORCE PROFILE COMPLETION ===
  useEffect(() => {
    if (
      isAuthenticated &&
      !vendorProfile.isComplete &&
      currentPage !== "profile"
    ) {
      setCurrentPage("profile");
    }
  }, [isAuthenticated, vendorProfile.isComplete, currentPage, setCurrentPage]);

  // === RENDER LOGIC ===
  if (showSplash || isLoading) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return (
      <Login
        onLogin={() => {
          localStorage.setItem("vendorSession", "active");
          window.location.reload(); // Cleanest way to trigger full auth flow
        }}
      />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <Orders />;
      case "products":
        return <Products />;
      case "special-orders":
        return <SpecialOrders />;
      case "wallet":
        return <Wallet />;
      case "profile":
        return <Profile />;
      case "support":
        return <Support />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onLogout={logout}
      notifications={notifications}
      vendorName={vendorProfile.name}
      vendorImage={vendorProfile.profileImage || ""}
    >
      {renderPage()}
    </Layout>
  );
}
