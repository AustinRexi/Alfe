// providers/AppContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Page =
  | "dashboard"
  | "dashboard"
  | "orders"
  | "products"
  | "special-orders"
  | "wallet"
  | "profile"
  | "support"
  | "settings";

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  vendorProfile: any;
  setVendorProfile: (profile: any) => void;
  notifications: any[];
  markNotificationAsRead: (id: number) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  const [vendorProfile, setVendorProfile] = useState({
    isComplete: false,
    isVerified: false,
    name: "John Doe",
    email: "john@example.com",
    phone: "",
    nin: "",
    sex: "",
    businessAddress: "",
    residentialAddress: "",
    state: "",
    category: "",
    profileImage: "",
  });

  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received", read: false, time: "5 mins ago" },
    {
      id: 2,
      message: "Special order awaiting your bid",
      read: false,
      time: "15 mins ago",
    },
    {
      id: 3,
      message: "Payment ready for withdrawal",
      read: false,
      time: "1 hour ago",
    },
  ]);

  useEffect(() => {
    const session = localStorage.getItem("vendorSession");
    const profile = localStorage.getItem("vendorProfile");
    if (session) {
      setIsAuthenticated(true);
      if (profile) setVendorProfile(JSON.parse(profile));
    }
  }, []);

  const setVendorProfile = (profile: any) => {
    set(profile);
    localStorage.setItem("vendorProfile", JSON.stringify(profile));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPage("dashboard");
    localStorage.removeItem("vendorSession");
    localStorage.removeItem("vendorProfile");
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentPage,
        setCurrentPage,
        vendorProfile,
        setVendorProfile,
        notifications,
        markNotificationAsRead,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
