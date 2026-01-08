// src/app/orders/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Download,
  CheckCircle,
  XCircle,
  Clock,
  PlayCircle,
  AlertCircle,
  Eye,
  X,
  Truck,
  Ruler,
  Calendar,
  Scissors,
  Shirt,
  AlertTriangle,
} from "lucide-react";
import { useApp } from "@/provider/AppContext";

interface Order {
  id: string;
  measurements: Record<string, string>;
  item: string;
  fabric: string;
  fabricCost: number;
  sewingCost: number;
  totalAmount: number;
  yards: number;
  orderDate: string;
  dueDate: string;
  referenceImage?: string;
  notes?: string;
  currentStage?: string;
  completedDate?: string;
}

const tabs = ["pending", "in-progress", "completed", "rejected"] as const;
type TabType = (typeof tabs)[number];

const stages = [
  "Received",
  "Measurements Confirmed",
  "Cutting",
  "Sewing",
  "Finishing",
  "Ready for Delivery",
] as const;

// Helper to infer size from measurements (standard fashion sizing)
const getSizeFromMeasurements = (
  measurements: Record<string, string>
): { size: string; label: string } => {
  const bust = parseFloat(measurements.bust?.replace('"', "") || "0");
  const chest = parseFloat(measurements.chest?.replace('"', "") || "0");
  const waist = parseFloat(measurements.waist?.replace('"', "") || "0");
  const hips = parseFloat(measurements.hips?.replace('"', "") || "0");

  // Prioritize bust/chest for sizing
  const primary = bust || chest || hips || waist;

  if (primary === 0) return { size: "Unknown", label: "Size Unknown" };

  // Women's standard sizes (bust in inches)
  if (bust > 0) {
    if (bust <= 32) return { size: "XS", label: "Extra Small" };
    if (bust <= 34) return { size: "S", label: "Small" };
    if (bust <= 36) return { size: "M", label: "Medium" };
    if (bust <= 39) return { size: "L", label: "Large" };
    if (bust <= 42) return { size: "XL", label: "Extra Large" };
    if (bust <= 45) return { size: "XXL", label: "XXL" };
    return { size: "3XL+", label: "3XL and above" };
  }

  // Men's standard sizes (chest in inches)
  if (chest > 0) {
    if (chest <= 36) return { size: "S", label: "Small" };
    if (chest <= 40) return { size: "M", label: "Medium" };
    if (chest <= 44) return { size: "L", label: "Large" };
    if (chest <= 48) return { size: "XL", label: "Extra Large" };
    if (chest <= 52) return { size: "XXL", label: "XXL" };
    return { size: "3XL+", label: "3XL and above" };
  }

  return { size: "Custom", label: "Custom Fit" };
};

const mockOrders: Record<TabType, Order[]> = {
  pending: [
    {
      id: "ORD-2024-001",
      measurements: {
        bust: '36"',
        waist: '28"',
        hips: '38"',
        length: '42"',
        shoulder: '15"',
      },
      item: "Ankara Gown",
      fabric: "Premium Ankara Print",
      fabricCost: 18000,
      sewingCost: 7000,
      totalAmount: 25000,
      yards: 3.5,
      orderDate: "2024-12-01",
      dueDate: "2024-12-05",
      referenceImage:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      notes: "Customer prefers fitted waist with flare at bottom",
    },
    {
      id: "ORD-2024-002",
      measurements: {
        chest: '42"',
        waist: '36"',
        shoulder: '18"',
        sleeve: '24"',
        trouser_length: '40"',
      },
      item: "Senator Suit",
      fabric: "Premium Senator Material",
      fabricCost: 22000,
      sewingCost: 13000,
      totalAmount: 35000,
      yards: 5,
      orderDate: "2024-12-01",
      dueDate: "2024-12-08",
      referenceImage:
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80",
      notes: "Client wants slim fit style",
    },
  ],
  "in-progress": [
    {
      id: "ORD-2024-003",
      measurements: {
        bust: '38"',
        waist: '30"',
        hips: '40"',
        blouse_length: '22"',
        wrapper_length: '42"',
      },
      item: "Lace Blouse & Wrapper",
      fabric: "French Lace",
      fabricCost: 20000,
      sewingCost: 10000,
      totalAmount: 30000,
      yards: 4,
      orderDate: "2024-11-28",
      dueDate: "2024-12-03",
      currentStage: "Sewing",
      referenceImage:
        "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=800&q=80",
      notes: "Use blue thread for embellishment",
    },
  ],
  completed: [
    {
      id: "ORD-2024-004",
      measurements: { bust: '34"', waist: '26"', hips: '36"', length: '38"' },
      item: "Corporate Dress",
      fabric: "Cotton Blend",
      fabricCost: 12000,
      sewingCost: 8000,
      totalAmount: 20000,
      yards: 2.5,
      orderDate: "2024-11-25",
      dueDate: "2024-11-30",
      completedDate: "2024-11-29",
      referenceImage:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    },
  ],
  rejected: [],
};

export default function Orders() {
  const { vendorProfile } = useApp();
  const isVerified = vendorProfile.isVerified;

  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders = mockOrders[activeTab];

  const handleAcceptOrder = (id: string) => {
    alert(`Order ${id} accepted! Funds will be added to your wallet shortly.`);
    setSelectedOrder(null);
  };

  const handleRejectOrder = (id: string) => {
    if (confirm("Are you sure you want to reject this order?")) {
      alert(`Order ${id} has been rejected.`);
      setSelectedOrder(null);
    }
  };

  const downloadMeasurements = () => {
    alert("Downloading measurements PDF...");
  };

  const handleSendToLogistics = async (order: Order) => {
    await new Promise((r) => setTimeout(r, 1000));
    alert(
      `Logistics request sent for ${order.id}\nPickup scheduled for tomorrow`
    );
    setSelectedOrder(null);
  };

  const getCurrentStageIndex = (stage?: string): number => {
    if (!stage) return 0;
    const index = stages.indexOf(stage as (typeof stages)[number]);
    return index === -1 ? 0 : index;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
        <p className="text-slate-600 mt-1">
          Manage and track all your fashion orders in real-time
        </p>
      </div>

      {/* Verification Alert */}
      {!isVerified && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
          <AlertCircle
            className="text-amber-600 mt-1 flex-shrink-0"
            size={24}
          />
          <div>
            <h3 className="font-semibold text-amber-900 flex items-center gap-2">
              <AlertTriangle size={18} /> Profile Not Verified
            </h3>
            <p className="text-sm text-amber-800 mt-1">
              Complete your profile verification to accept and manage orders.
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => {
          const count = mockOrders[tab].length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium capitalize whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-blue-900 text-white shadow-lg"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab.replace("-", " ")}{" "}
              <span className="ml-2 opacity-80">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Orders Grid */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
          <Clock size={64} className="mx-auto text-slate-300 mb-4" />
          <p className="text-xl font-medium text-slate-500">
            No {activeTab.replace("-", " ")} orders yet
          </p>
          <p className="text-sm text-slate-400 mt-2">
            New orders will appear here automatically
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {orders.map((order) => {
            const { size, label } = getSizeFromMeasurements(order.measurements);

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {order.id}
                    </h3>
                    <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                      <Shirt size={16} className="text-blue-900" /> {order.item}
                    </p>
                    {/* Size Badge */}
                    <div className="mt-3 inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold">
                      <Ruler size={16} />
                      Size {size} ({label})
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-2.5 hover:bg-blue-50 rounded-xl transition-colors"
                  >
                    <Eye size={22} className="text-blue-900" />
                  </button>
                </div>

                {/* Reference Image */}
                {order.referenceImage && (
                  <div className="relative aspect-video bg-slate-100">
                    <Image
                      src={order.referenceImage}
                      alt={order.item}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      priority={activeTab === "pending"}
                    />
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <p className="text-xs text-slate-600 flex items-center gap-2">
                        <Scissors size={14} /> Fabric
                      </p>
                      <p className="font-medium text-sm mt-1">{order.fabric}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <p className="text-xs text-slate-600 flex items-center gap-2">
                        <Ruler size={14} /> Yards
                      </p>
                      <p className="font-medium text-sm mt-1">
                        {order.yards} yards
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Total Amount</span>
                      <span className="text-2xl font-bold text-blue-900">
                        ₦{order.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} /> {order.orderDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} /> Due: {order.dueDate}
                    </div>
                  </div>

                  {order.currentStage && (
                    <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-3">
                      <PlayCircle size={20} className="text-blue-900" />
                      <span className="font-medium text-blue-900">
                        Current: {order.currentStage}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={downloadMeasurements}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all"
                    >
                      <Download size={18} />
                      Measurements
                    </button>

                    {activeTab === "pending" && isVerified && (
                      <>
                        <button
                          onClick={() => handleAcceptOrder(order.id)}
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all"
                        >
                          <CheckCircle size={18} />
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectOrder(order.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-3.5 rounded-xl transition-all"
                        >
                          <XCircle size={18} />
                        </button>
                      </>
                    )}

                    {activeTab === "in-progress" && (
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all"
                      >
                        <PlayCircle size={18} />
                        Update Stage
                      </button>
                    )}

                    {activeTab === "completed" && (
                      <button
                        onClick={() => handleSendToLogistics(order)}
                        className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all"
                      >
                        <Truck size={18} />
                        Send to Logistics
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder &&
        (() => {
          const { size, label } = getSizeFromMeasurements(
            selectedOrder.measurements
          );
          return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center z-10">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Order Details — {selectedOrder.id}
                    </h2>
                    <p className="text-lg text-blue-900 font-semibold mt-2 flex items-center gap-3">
                      <Ruler size={22} />
                      Size {size} ({label})
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-3 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={28} className="text-slate-600" />
                  </button>
                </div>

                <div className="p-6 space-y-8">
                  {selectedOrder.referenceImage && (
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
                      <Image
                        src={selectedOrder.referenceImage}
                        alt={selectedOrder.item}
                        fill
                        sizes="800px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-3">
                      <Ruler size={24} className="text-blue-900" /> Customer
                      Measurements
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(selectedOrder.measurements).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="bg-slate-50 p-5 rounded-2xl text-center"
                          >
                            <p className="text-xs text-slate-600 uppercase tracking-wider">
                              {key.replace("_", " ")}
                            </p>
                            <p className="text-2xl font-bold text-slate-900 mt-2">
                              {value}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {selectedOrder.notes && (
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                        <AlertTriangle size={24} className="text-amber-600" />{" "}
                        Special Instructions
                      </h3>
                      <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
                        <p className="text-slate-800 leading-relaxed">
                          {selectedOrder.notes}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "in-progress" &&
                    selectedOrder.currentStage && (
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-3">
                          <PlayCircle size={24} className="text-blue-900" />{" "}
                          Production Progress
                        </h3>
                        <div className="space-y-4">
                          {stages.map((stage, index) => {
                            const currentIndex = getCurrentStageIndex(
                              selectedOrder.currentStage
                            );
                            const isCompleted = index < currentIndex;
                            const isCurrent = index === currentIndex;

                            return (
                              <div
                                key={stage}
                                className={`flex items-center gap-4 p-5 rounded-2xl transition-all ${
                                  isCurrent
                                    ? "bg-blue-50 border-2 border-blue-300 shadow-md"
                                    : isCompleted
                                    ? "bg-emerald-50"
                                    : "bg-slate-50 opacity-70"
                                }`}
                              >
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                                    isCurrent
                                      ? "bg-blue-900"
                                      : isCompleted
                                      ? "bg-emerald-500"
                                      : "bg-slate-400"
                                  }`}
                                >
                                  {isCompleted || isCurrent ? (
                                    <CheckCircle size={24} />
                                  ) : (
                                    index + 1
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p
                                    className={`font-medium ${
                                      isCurrent
                                        ? "text-blue-900"
                                        : "text-slate-700"
                                    }`}
                                  >
                                    {stage}
                                  </p>
                                  {isCurrent && (
                                    <p className="text-xs text-blue-700 mt-1">
                                      Currently in progress
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  <div className="flex gap-4 pt-6 border-t border-slate-200">
                    <button
                      onClick={downloadMeasurements}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 py-4 rounded-2xl flex items-center justify-center gap-3 font-medium transition-all"
                    >
                      <Download size={22} />
                      Download Measurements PDF
                    </button>
                    {activeTab === "completed" && (
                      <button
                        onClick={() => handleSendToLogistics(selectedOrder)}
                        className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-medium transition-all shadow-lg"
                      >
                        <Truck size={22} />
                        Send to Logistics
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
}
