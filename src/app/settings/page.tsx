// src/app/settings/page.tsx
"use client";

import React, { useState } from "react";
import { useApp } from "@/provider/AppContext";
import {
  User,
  Bell,
  Lock,
  CreditCard,
  Clock,
  LogOut,
  Save,
  Eye,
  EyeOff,
  Building2,
  Smartphone,
  Mail,
  Shield,
  Banknote,
} from "lucide-react";

interface AccountSettings {
  displayName: string;
  businessName: string;
  email: string;
  phone: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  newOrders: boolean;
  orderUpdates: boolean;
  specialOrders: boolean;
  walletUpdates: boolean;
  supportMessages: boolean;
}

interface BankingDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface DayHours {
  open: string;
  close: string;
  isOpen: boolean;
}

interface OperatingHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export default function Settings() {
  const { logout } = useApp();

  const [activeTab, setActiveTab] = useState<
    "account" | "notifications" | "security" | "banking" | "hours"
  >("account");
  const [showPassword, setShowPassword] = useState(false);

  const [accountSettings, setAccountSettings] = useState<AccountSettings>({
    displayName: "John Doe",
    email: "john@example.com",
    phone: "+234 800 123 4567",
    businessName: "John's Fashion House",
  });

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      newOrders: true,
      orderUpdates: true,
      specialOrders: true,
      walletUpdates: true,
      supportMessages: true,
    });

  const [bankingDetails, setBankingDetails] = useState<BankingDetails>({
    bankName: "GTBank",
    accountNumber: "0123456789",
    accountName: "John Doe",
  });

  const [operatingHours, setOperatingHours] = useState<OperatingHours>({
    monday: { open: "08:00", close: "18:00", isOpen: true },
    tuesday: { open: "08:00", close: "18:00", isOpen: true },
    wednesday: { open: "08:00", close: "18:00", isOpen: true },
    thursday: { open: "08:00", close: "18:00", isOpen: true },
    friday: { open: "08:00", close: "18:00", isOpen: true },
    saturday: { open: "10:00", close: "16:00", isOpen: true },
    sunday: { open: "10:00", close: "16:00", isOpen: false },
  });

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "banking", label: "Banking Details", icon: CreditCard },
    { id: "hours", label: "Operating Hours", icon: Clock },
  ] as const;

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ] as const;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-4xl font-bold text-slate-900">Settings</h1>
        <p className="text-lg text-slate-600 mt-3">
          Manage your account, preferences, and business settings
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition-all ${
                      isActive
                        ? "bg-blue-900 text-white shadow-lg"
                        : "text-slate-700 hover:bg-slate-50 hover:shadow-md"
                    }`}
                  >
                    <Icon size={22} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-200 p-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-600 hover:bg-red-50 transition-all font-medium"
              >
                <LogOut size={22} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
            {/* Account Settings */}
            {activeTab === "account" && (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <User size={32} className="text-blue-900" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Account Information
                    </h2>
                    <p className="text-slate-600">
                      Update your personal and business details
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={accountSettings.displayName}
                      onChange={(e) =>
                        setAccountSettings((prev) => ({
                          ...prev,
                          displayName: e.target.value,
                        }))
                      }
                      className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      <Building2 size={18} className="inline mr-2" /> Business
                      Name
                    </label>
                    <input
                      type="text"
                      value={accountSettings.businessName}
                      onChange={(e) =>
                        setAccountSettings((prev) => ({
                          ...prev,
                          businessName: e.target.value,
                        }))
                      }
                      className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                      placeholder="John's Fashion House"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      <Mail size={18} className="inline mr-2" /> Email Address
                    </label>
                    <input
                      type="email"
                      value={accountSettings.email}
                      disabled
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      <Smartphone size={18} className="inline mr-2" /> Phone
                      Number
                    </label>
                    <input
                      type="tel"
                      value={accountSettings.phone}
                      onChange={(e) =>
                        setAccountSettings((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                      placeholder="+234 800 123 4567"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <Bell size={32} className="text-blue-900" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Notification Preferences
                    </h2>
                    <p className="text-slate-600">
                      Choose how you want to be notified
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Notification Channels
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: "emailNotifications",
                          label: "Email Notifications",
                          desc: "Receive updates via email",
                          icon: Mail,
                        },
                        {
                          key: "pushNotifications",
                          label: "Push Notifications",
                          desc: "Instant alerts on your device",
                          icon: Smartphone,
                        },
                        {
                          key: "smsNotifications",
                          label: "SMS Notifications",
                          desc: "Text message alerts",
                          icon: Smartphone,
                        },
                      ].map((item) => (
                        <label
                          key={item.key}
                          className="flex items-center justify-between p-5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <item.icon size={22} className="text-blue-900" />
                            <div>
                              <p className="font-medium text-slate-900">
                                {item.label}
                              </p>
                              <p className="text-sm text-slate-600">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={
                              notificationSettings[
                                item.key as keyof NotificationSettings
                              ]
                            }
                            onChange={(e) =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                [item.key]: e.target.checked,
                              }))
                            }
                            className="w-6 h-6 rounded text-blue-900 focus:ring-blue-900"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Notify Me About
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: "newOrders",
                          label: "New Orders",
                          desc: "When a customer places an order",
                        },
                        {
                          key: "orderUpdates",
                          label: "Order Updates",
                          desc: "Status changes, messages, delivery",
                        },
                        {
                          key: "specialOrders",
                          label: "Special Order Requests",
                          desc: "Bids and custom requests",
                        },
                        {
                          key: "walletUpdates",
                          label: "Wallet & Payments",
                          desc: "Payouts, withdrawals, refunds",
                        },
                        {
                          key: "supportMessages",
                          label: "Support Messages",
                          desc: "Replies from OneFit support",
                        },
                      ].map((item) => (
                        <label
                          key={item.key}
                          className="flex items-center justify-between p-5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          <div>
                            <p className="font-medium text-slate-900">
                              {item.label}
                            </p>
                            <p className="text-sm text-slate-600">
                              {item.desc}
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={
                              notificationSettings[
                                item.key as keyof NotificationSettings
                              ]
                            }
                            onChange={(e) =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                [item.key]: e.target.checked,
                              }))
                            }
                            className="w-6 h-6 rounded text-blue-900 focus:ring-blue-900"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <Shield size={32} className="text-blue-900" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Security & Password
                    </h2>
                    <p className="text-slate-600">Keep your account secure</p>
                  </div>
                </div>

                <div className="max-w-2xl space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-5 py-4 pr-14 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      >
                        {showPassword ? (
                          <EyeOff size={22} />
                        ) : (
                          <Eye size={22} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-medium transition-all flex items-center gap-3">
                    <Lock size={20} />
                    Update Password
                  </button>

                  <div className="pt-8 border-t border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Two-Factor Authentication (2FA)
                    </h3>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                      <p className="text-slate-700 mb-4">
                        Add an extra layer of security with 2FA via SMS or
                        authenticator app
                      </p>
                      <button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all">
                        Enable Two-Factor Authentication
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Banking */}
            {activeTab === "banking" && (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <Banknote size={32} className="text-blue-900" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Banking Details
                    </h2>
                    <p className="text-slate-600">
                      Where your earnings will be sent
                    </p>
                  </div>
                </div>

                <div className="max-w-2xl space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Bank Name
                    </label>
                    <select
                      value={bankingDetails.bankName}
                      onChange={(e) =>
                        setBankingDetails((prev) => ({
                          ...prev,
                          bankName: e.target.value,
                        }))
                      }
                      className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                    >
                      <option>GTBank</option>
                      <option>Access Bank</option>
                      <option>First Bank</option>
                      <option>UBA</option>
                      <option>Zenith Bank</option>
                      <option>Kuda Bank</option>
                      <option>Opay</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={bankingDetails.accountNumber}
                      onChange={(e) =>
                        setBankingDetails((prev) => ({
                          ...prev,
                          accountNumber: e.target.value,
                        }))
                      }
                      className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                      placeholder="0123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      value={bankingDetails.accountName}
                      onChange={(e) =>
                        setBankingDetails((prev) => ({
                          ...prev,
                          accountName: e.target.value,
                        }))
                      }
                      className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl">
                    <p className="text-amber-800 text-sm">
                      Changes to banking details require verification. Funds may
                      be delayed during review.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Operating Hours */}
            {activeTab === "hours" && (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <Clock size={32} className="text-blue-900" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Operating Hours
                    </h2>
                    <p className="text-slate-600">
                      Set when customers can place orders
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {days.map((day) => {
                    const hours = operatingHours[day];
                    const dayName = day.charAt(0).toUpperCase() + day.slice(1);
                    return (
                      <div
                        key={day}
                        className="flex items-center gap-6 p-5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
                      >
                        <div className="w-32">
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={hours.isOpen}
                              onChange={(e) =>
                                setOperatingHours((prev) => ({
                                  ...prev,
                                  [day]: { ...hours, isOpen: e.target.checked },
                                }))
                              }
                              className="w-6 h-6 rounded text-blue-900 focus:ring-blue-900"
                            />
                            <span className="font-medium text-slate-900">
                              {dayName}
                            </span>
                          </label>
                        </div>

                        {hours.isOpen ? (
                          <div className="flex items-center gap-4 flex-1">
                            <input
                              type="time"
                              value={hours.open}
                              onChange={(e) =>
                                setOperatingHours((prev) => ({
                                  ...prev,
                                  [day]: { ...hours, open: e.target.value },
                                }))
                              }
                              className="px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                            />
                            <span className="text-slate-500 font-medium">
                              to
                            </span>
                            <input
                              type="time"
                              value={hours.close}
                              onChange={(e) =>
                                setOperatingHours((prev) => ({
                                  ...prev,
                                  [day]: { ...hours, close: e.target.value },
                                }))
                              }
                              className="px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                            />
                          </div>
                        ) : (
                          <span className="text-slate-500 font-medium">
                            Closed
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-10 border-t border-slate-200">
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center gap-3 hover:shadow-2xl"
              >
                <Save size={26} />
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
