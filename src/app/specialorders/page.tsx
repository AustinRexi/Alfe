// src/app/specialorders/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useApp } from "@/provider/AppContext";
import {
  AlertCircle,
  Send,
  Eye,
  X,
  Calendar,
  DollarSign,
  MessageSquare,
  Tag,
  Clock,
  Users,
} from "lucide-react";

interface SpecialOrder {
  id: string;
  customer: string;
  title: string;
  description: string;
  referenceImage?: string;
  dueDate: string;
  budget: string;
  postedDate: string;
  bidsCount: number;
  notes?: string;
}

interface BidData {
  sewingCost: string;
  fabricType: string;
  yardage: string;
  notes: string;
}

export default function SpecialOrders() {
  const { vendorProfile } = useApp();
  const isVerified = vendorProfile.isVerified;

  const [selectedOrder, setSelectedOrder] = useState<SpecialOrder | null>(null);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidData, setBidData] = useState<BidData>({
    sewingCost: "",
    fabricType: "",
    yardage: "",
    notes: "",
  });

  const specialOrders: SpecialOrder[] = [
    {
      id: "SPL-2024-001",
      customer: "Anonymous Customer",
      title: "Custom Wedding Gown",
      description:
        "Looking for an elegant wedding gown with lace details and long train. Should be modest and classic.",
      referenceImage:
        "https://images.unsplash.com/photo-1519657337289-077653f7a321?w=800&q=80",
      dueDate: "2024-12-20",
      budget: "₦80,000 - ₦120,000",
      postedDate: "2024-12-01",
      bidsCount: 3,
      notes:
        "Customer prefers white or ivory. Must be able to provide portfolio.",
    },
    {
      id: "SPL-2024-002",
      customer: "Anonymous Customer",
      title: "Traditional Agbada Set",
      description:
        "Need a complete traditional Agbada outfit for a special ceremony. Should include cap and matching trousers.",
      referenceImage:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
      dueDate: "2024-12-15",
      budget: "₦50,000 - ₦70,000",
      postedDate: "2024-12-01",
      bidsCount: 5,
      notes: "Rich embroidery preferred. Gold or royal blue colors.",
    },
    {
      id: "SPL-2024-003",
      customer: "Anonymous Customer",
      title: "Kids Birthday Dress",
      description:
        "Princess-style dress for 5-year-old girl. Should be comfortable and colorful.",
      referenceImage:
        "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80",
      dueDate: "2024-12-10",
      budget: "₦15,000 - ₦25,000",
      postedDate: "2024-12-02",
      bidsCount: 2,
      notes: "Pink or purple preferred. Must be ready before December 10th.",
    },
  ];

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    const fabricCost = 25000;
    const totalAmount = parseFloat(bidData.sewingCost) + fabricCost;

    alert(
      `Bid Submitted Successfully!\n\n` +
        `Sewing Cost: ₦${parseFloat(bidData.sewingCost).toLocaleString()}\n` +
        `Fabric Cost (Est.): ₦${fabricCost.toLocaleString()}\n` +
        `Total Amount: ₦${totalAmount.toLocaleString()}\n\n` +
        `The customer has been notified. You’ll receive a response once they review your bid.`
    );

    setShowBidForm(false);
    setSelectedOrder(null);
    setBidData({ sewingCost: "", fabricType: "", yardage: "", notes: "" });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-4xl font-bold text-slate-900">Special Orders</h1>
        <p className="text-xl text-slate-600 mt-3">
          Bid on custom, high-value fashion projects
        </p>
      </div>

      {/* Verification Alert */}
      {!isVerified && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-5 shadow-lg">
          <AlertCircle
            size={32}
            className="text-amber-600 flex-shrink-0 mt-1"
          />
          <div>
            <h3 className="text-xl font-bold text-amber-900">
              Profile Verification Required
            </h3>
            <p className="text-amber-800 mt-2">
              Complete your profile verification to bid on special orders and
              win premium clients.
            </p>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 shadow-md">
        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-3">
          <MessageSquare size={28} />
          How Special Orders Work
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-blue-800">
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              Customers post unique designs not in the catalog
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              You submit a detailed bid with cost & materials
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              Customer reviews all bids and picks the best
            </li>
          </ul>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              Winner gets the job — just like regular orders
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              Payment secured upfront via OneFit
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              Higher earnings potential on custom work
            </li>
          </ul>
        </div>
      </div>

      {/* Special Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {specialOrders.map((order) => (
          <div
            key={order.id}
            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 line-clamp-2">
                    {order.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">{order.id}</p>
                </div>
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Users size={16} />
                  {order.bidsCount} Bids
                </div>
              </div>

              {/* Reference Image */}
              {order.referenceImage && (
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-slate-100">
                  <Image
                    src={order.referenceImage}
                    alt={order.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <p className="text-slate-700 line-clamp-3 mb-5">
                {order.description}
              </p>

              {/* Quick Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 flex items-center gap-2">
                    <DollarSign size={18} /> Budget
                  </span>
                  <span className="font-bold text-green-600">
                    {order.budget}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 flex items-center gap-2">
                    <Calendar size={18} /> Due Date
                  </span>
                  <span className="font-medium text-slate-900">
                    {order.dueDate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 flex items-center gap-2">
                    <Clock size={18} /> Posted
                  </span>
                  <span className="text-slate-500">{order.postedDate}</span>
                </div>
              </div>

              {order.notes && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-5">
                  <p className="text-sm text-amber-900 flex items-start gap-2">
                    <Tag size={16} className="mt-0.5" />
                    {order.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Eye size={20} />
                  View Details
                </button>
                {isVerified && (
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowBidForm(true);
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white py-4 rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Submit Bid
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bid Form Modal */}
      {showBidForm && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">
                Submit Your Bid
              </h2>
              <button
                onClick={() => {
                  setShowBidForm(false);
                  setSelectedOrder(null);
                }}
                className="p-3 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={28} className="text-slate-600" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Order Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {selectedOrder.title}
                </h3>
                <p className="text-slate-700 mb-4">
                  {selectedOrder.description}
                </p>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="flex items-center gap-3">
                    <DollarSign size={20} className="text-green-600" />
                    <div>
                      <p className="text-slate-600">Budget Range</p>
                      <p className="font-bold text-green-600">
                        {selectedOrder.budget}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-blue-900" />
                    <div>
                      <p className="text-slate-600">Due Date</p>
                      <p className="font-bold text-blue-900">
                        {selectedOrder.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bid Form */}
              <form onSubmit={handleSubmitBid} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Your Sewing Cost (₦){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={bidData.sewingCost}
                      onChange={(e) =>
                        setBidData((prev) => ({
                          ...prev,
                          sewingCost: e.target.value,
                        }))
                      }
                      className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                      placeholder="e.g., 45000"
                      required
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      This is your labor + profit
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Fabric Type Required{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={bidData.fabricType}
                      onChange={(e) =>
                        setBidData((prev) => ({
                          ...prev,
                          fabricType: e.target.value,
                        }))
                      }
                      className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                      placeholder="e.g., Premium Lace, Heavy Brocade"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Yards Needed <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={bidData.yardage}
                      onChange={(e) =>
                        setBidData((prev) => ({
                          ...prev,
                          yardage: e.target.value,
                        }))
                      }
                      className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                      placeholder="e.g., 6.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      value={bidData.notes}
                      onChange={(e) =>
                        setBidData((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      rows={4}
                      className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all resize-none"
                      placeholder="Mention your experience, turnaround time, or special techniques..."
                    />
                  </div>
                </div>

                {/* Price Preview */}
                {bidData.sewingCost && (
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-emerald-900 mb-4">
                      Customer Will Pay
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-lg">
                        <span className="text-slate-700">
                          Sewing Cost (Your Bid)
                        </span>
                        <span className="font-bold text-emerald-900">
                          ₦{parseFloat(bidData.sewingCost).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-slate-700">
                          Estimated Fabric Cost
                        </span>
                        <span className="font-bold text-emerald-900">
                          ₦25,000
                        </span>
                      </div>
                      <div className="pt-4 border-t-2 border-emerald-200 flex justify-between">
                        <span className="text-xl font-bold text-emerald-900">
                          Total Amount
                        </span>
                        <span className="text-2xl font-bold text-emerald-900">
                          ₦
                          {(
                            parseFloat(bidData.sewingCost) + 25000
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-emerald-700 mt-4">
                      Final fabric cost may vary based on customer’s choice
                    </p>
                  </div>
                )}

                {/* Submit */}
                <div className="flex gap-4 pt-6 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowBidForm(false);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-5 rounded-xl font-medium transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white py-5 rounded-xl font-bold transition-all shadow-xl flex items-center justify-center gap-3"
                  >
                    <Send size={24} />
                    Submit My Bid
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedOrder && !showBidForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">
                Special Order Details
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-3 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={28} className="text-slate-600" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  {selectedOrder.title}
                </h3>
                <p className="text-slate-500">{selectedOrder.id}</p>
              </div>

              {selectedOrder.referenceImage && (
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
                  <Image
                    src={selectedOrder.referenceImage}
                    alt={selectedOrder.title}
                    fill
                    sizes="800px"
                    className="object-cover"
                  />
                </div>
              )}

              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  Full Description
                </h4>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {selectedOrder.description}
                </p>
              </div>

              {selectedOrder.notes && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-6 rounded-2xl">
                  <h4 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-3">
                    <Tag size={24} />
                    Special Requirements
                  </h4>
                  <p className="text-amber-800 leading-relaxed">
                    {selectedOrder.notes}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-slate-50 p-5 rounded-xl text-center">
                  <DollarSign
                    size={28}
                    className="text-green-600 mx-auto mb-2"
                  />
                  <p className="text-sm text-slate-600">Budget</p>
                  <p className="font-bold text-green-600">
                    {selectedOrder.budget}
                  </p>
                </div>
                <div className="bg-slate-50 p-5 rounded-xl text-center">
                  <Calendar size={28} className="text-blue-900 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Due Date</p>
                  <p className="font-bold text-blue-900">
                    {selectedOrder.dueDate}
                  </p>
                </div>
                <div className="bg-slate-50 p-5 rounded-xl text-center">
                  <Clock size={28} className="text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Posted</p>
                  <p className="font-medium">{selectedOrder.postedDate}</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-xl text-center">
                  <Users size={28} className="text-amber-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Bids</p>
                  <p className="font-bold text-amber-600">
                    {selectedOrder.bidsCount}
                  </p>
                </div>
              </div>

              {isVerified && (
                <button
                  onClick={() => setShowBidForm(true)}
                  className="w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white py-6 rounded-2xl font-bold text-xl shadow-xl transition-all flex items-center justify-center gap-4"
                >
                  <Send size={28} />
                  Submit Your Competitive Bid
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
