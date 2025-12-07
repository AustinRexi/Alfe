// app/dashboard/page.tsx
"use client";

import React from "react";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  DollarSign,
  Timer,
  BadgeCheck,
  AlertCircle,
  ArrowRight,
  Activity,
} from "lucide-react";
import { useApp } from "@/provider/AppContext";

interface Stat {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  change: string;
  trend?: "up" | "down";
}

interface RecentOrder {
  id: string;
  item: string;
  status: "Pending" | "In Progress" | "Ready" | "Completed";
  amount: string;
  stage: string;
  dueDate: string;
}

export default function Dashboard() {
  const { vendorProfile, setCurrentPage } = useApp();
  const isVerified = vendorProfile.isVerified;

  const stats: Stat[] = [
    {
      label: "Total Orders",
      value: "48",
      icon: ShoppingBag,
      color: "bg-blue-900",
      change: "+12%",
      trend: "up",
    },
    {
      label: "Pending Orders",
      value: "7",
      icon: Timer,
      color: "bg-amber-500",
      change: "+3",
      trend: "up",
    },
    {
      label: "Completed",
      value: "35",
      icon: BadgeCheck,
      color: "bg-emerald-600",
      change: "+8",
      trend: "up",
    },
    {
      label: "Wallet Balance",
      value: "₦125,450",
      icon: DollarSign,
      color: "bg-teal-600",
      change: "+₦15k",
      trend: "up",
    },
  ];

  const recentOrders: RecentOrder[] = [
    {
      id: "ORD-2024-001",
      item: "Ankara Gown",
      status: "In Progress",
      amount: "₦25,000",
      stage: "Sewing",
      dueDate: "2024-12-05",
    },
    {
      id: "ORD-2024-002",
      item: "Senator Suit",
      status: "Pending",
      amount: "₦35,000",
      stage: "Awaiting Acceptance",
      dueDate: "2024-12-08",
    },
    {
      id: "ORD-2024-003",
      item: "Lace Blouse & Wrapper",
      status: "Ready",
      amount: "₦30,000",
      stage: "Ready for Delivery",
      dueDate: "2024-12-03",
    },
  ];

  const quickActions = [
    {
      label: "View All Orders",
      icon: ShoppingBag,
      action: "orders" as const,
      color: "from-blue-900 to-blue-700",
    },
    {
      label: "Upload Product",
      icon: Package,
      action: "products" as const,
      color: "from-purple-600 to-purple-500",
    },
    {
      label: "Special Orders",
      icon: TrendingUp,
      action: "special-orders" as const,
      color: "from-amber-600 to-amber-500",
    },
    {
      label: "Check Wallet",
      icon: DollarSign,
      action: "wallet" as const,
      color: "from-teal-600 to-teal-500",
    },
  ];

  const activities = [
    {
      time: "10 mins ago",
      message: "Order ORD-2024-001 moved to Sewing stage",
      icon: Activity,
    },
    {
      time: "1 hour ago",
      message: "New order ORD-2024-005 received",
      icon: ShoppingBag,
    },
    {
      time: "2 hours ago",
      message: "₦15,000 added to wallet",
      icon: DollarSign,
    },
    {
      time: "3 hours ago",
      message: "Special order bid accepted",
      icon: TrendingUp,
    },
  ];

  const getStatusColor = (status: RecentOrder["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Ready":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Completed":
        return "bg-teal-100 text-teal-800 border-teal-200";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Welcome back, {vendorProfile.name}! Here is {`what's`} happening
            with your business today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-500">
            Last updated: <span className="font-medium">Just now</span>
          </div>
        </div>
      </div>

      {/* Verification Alert */}
      {!isVerified && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
          <AlertCircle
            className="text-amber-600 flex-shrink-0 mt-1"
            size={24}
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-amber-900">
              Complete Your Profile Verification
            </h3>
            <p className="text-sm text-amber-800 mt-1">
              You need to verify your account to start accepting orders and
              uploading products.
            </p>
            <button
              onClick={() => setCurrentPage("profile")}
              className="mt-4 bg-amber-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-amber-700 transition-all hover:shadow-md"
            >
              Complete Verification Now
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${stat.color} text-white shadow-lg`}
                >
                  <Icon size={28} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  <TrendingUp
                    size={18}
                    className={stat.trend === "down" ? "rotate-180" : ""}
                  />
                  {stat.change}
                </div>
              </div>
              <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-5">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.action}
                onClick={() => setCurrentPage(action.action)}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-transparent hover:shadow-xl transition-all duration-300 text-left"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} text-white p-3 mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon size={28} />
                </div>
                <p className="font-semibold text-slate-900 group-hover:text-blue-900 transition-colors">
                  {action.label}
                </p>
                <ArrowRight
                  className="mt-3 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-2 transition-all"
                  size={20}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Orders & Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 ">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-slate-900">Recent Orders</h2>
            <button
              onClick={() => setCurrentPage("orders")}
              className="text-blue-900 font-medium hover:underline flex items-center gap-2"
            >
              View All <ArrowRight size={18} />
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm ">
            <div className="overflow-x-auto ">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Stage
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-blue-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {order.item}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {order.stage}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">
                        {order.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-5">
            Recent Activity
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="space-y-6">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon size={18} className="text-blue-900" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900 font-medium">
                        {activity.message}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
