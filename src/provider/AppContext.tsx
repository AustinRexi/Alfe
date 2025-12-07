// src/providers/AppContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Page =
  | "dashboard"
  | "orders"
  | "products"
  | "special-orders"
  | "wallet"
  | "profile"
  | "support"
  | "settings";

interface Notification {
  id: number;
  message: string;
  read: boolean;
  time: string;
}

interface VendorProfile {
  isComplete: boolean;
  isVerified: boolean;
  name: string;
  email: string;
  phone: string;
  nin: string;
  sex: string;
  businessAddress: string;
  residentialAddress: string;
  state: string;
  category: string;
  profileImage: string;
}

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  vendorProfile: VendorProfile;
  setVendorProfile: (profile: VendorProfile) => void;
  notifications: Notification[];
  markAsRead: (id: number) => void;
  logout: () => void;
}

// Create context with proper type
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  const [vendorProfile, setVendorProfile] = useState<VendorProfile>({
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

  const [notifications, setNotifications] = useState<Notification[]>([
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
    const savedProfile = localStorage.getItem("vendorProfile");
    if (session) {
      setIsAuthenticated(true);
      if (savedProfile) {
        try {
          setVendorProfile(JSON.parse(savedProfile));
        } catch (e) {
          console.error("Failed to parse vendor profile");
        }
      }
    }
  }, []);

  const updateProfile = (profile: VendorProfile) => {
    setVendorProfile(profile);
    localStorage.setItem("vendorProfile", JSON.stringify(profile));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("vendorSession");
    localStorage.removeItem("vendorProfile");
    setCurrentPage("dashboard");
  };

  const markAsRead = (id: number) => {
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
        setVendorProfile: updateProfile,
        notifications,
        markAsRead,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
