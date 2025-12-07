// src/app/wallet/page.tsx
"use client";

import React, { useState } from "react";
import { useApp } from "@/provider/AppContext";
import {
  Wallet as WalletIcon,
  TrendingUp,
  Download,
  Clock,
  CheckCircle,
  Calendar,
  DollarSign,
  AlertCircle,
  Banknote,
  ArrowDownLeft,
  ArrowUpRight,
  X,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "earning" | "withdrawal";
  description: string;
  amount: number;
  status: "completed" | "pending";
  date: string;
  time: string;
  availableAt?: string;
}

interface WalletData {
  availableBalance: number;
  pendingBalance: number;
  totalEarnings: number;
  totalWithdrawals: number;
}

export default function Wallet() {
  const { vendorProfile } = useApp();
  const isVerified = vendorProfile.isVerified;

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const walletData: WalletData = {
    availableBalance: 125450,
    pendingBalance: 45000,
    totalEarnings: 485000,
    totalWithdrawals: 314550,
  };

  const transactions: Transaction[] = [
    {
      id: "TXN-001",
      type: "earning",
      description: "Order ORD-2024-003 - Lace Blouse & Wrapper",
      amount: 30000,
      status: "completed",
      date: "2024-12-01",
      time: "14:30",
    },
    {
      id: "TXN-002",
      type: "earning",
      description: "Order ORD-2024-001 - Ankara Gown",
      amount: 25000,
      status: "pending",
      date: "2024-12-01",
      time: "10:15",
      availableAt: "2 hours after acceptance",
    },
    {
      id: "TXN-003",
      type: "withdrawal",
      description: "Bank Transfer - GTBank (***1234)",
      amount: -50000,
      status: "completed",
      date: "2024-11-30",
      time: "09:00",
    },
    {
      id: "TXN-004",
      type: "earning",
      description: "Order ORD-2024-002 - Senator Suit",
      amount: 35000,
      status: "pending",
      date: "2024-12-01",
      time: "08:45",
      availableAt: "After delivery confirmation",
    },
    {
      id: "TXN-005",
      type: "earning",
      description: "Order ORD-2023-099 - Corporate Dress",
      amount: 20000,
      status: "completed",
      date: "2024-11-29",
      time: "16:20",
    },
  ];

  const stats = [
    {
      label: "Available Balance",
      value: `₦${walletData.availableBalance.toLocaleString()}`,
      icon: WalletIcon,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Pending Funds",
      value: `₦${walletData.pendingBalance.toLocaleString()}`,
      icon: Clock,
      color: "from-amber-500 to-amber-600",
    },
    {
      label: "Total Earnings",
      value: `₦${walletData.totalEarnings.toLocaleString()}`,
      icon: TrendingUp,
      color: "from-blue-900 to-blue-700",
    },
    {
      label: "Total Withdrawn",
      value: `₦${walletData.totalWithdrawals.toLocaleString()}`,
      icon: Download,
      color: "from-slate-600 to-slate-700",
    },
  ];

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);

    if (!amount || amount < 1000) {
      alert("Minimum withdrawal is ₦1,000");
      return;
    }
    if (amount > walletData.availableBalance) {
      alert("Insufficient available balance!");
      return;
    }

    alert(
      `Withdrawal Request Submitted!\n\n` +
        `Amount: ₦${amount.toLocaleString()}\n` +
        `Bank: GTBank ••••1234\n` +
        `Expected: Within 24 hours\n\n` +
        `You’ll receive a notification when the transfer is completed.`
    );

    setShowWithdrawModal(false);
    setWithdrawAmount("");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-4xl font-bold text-slate-900">Wallet & Earnings</h1>
        <p className="text-xl text-slate-600 mt-3">
          Track your income and withdraw funds securely
        </p>
      </div>

      {/* Verification Alert */}
      {!isVerified && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-8 shadow-lg">
          <div className="flex items-start gap-5">
            <AlertCircle size={36} className="text-amber-600 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-amber-900">
                Profile Verification Required
              </h3>
              <p className="text-amber-800 mt-2">
                Complete your profile to withdraw earnings and access full
                wallet features.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-8 shadow-lg">
        <div className="flex items-start gap-5">
          <div className="bg-blue-100 p-4 rounded-2xl">
            <AlertCircle size={32} className="text-blue-900" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              How Your Wallet Works
            </h3>
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="text-emerald-600 mt-0.5" />
                <span>
                  <strong>Earnings:</strong> Added 2 hours after accepting an
                  order
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="text-emerald-600 mt-0.5" />
                <span>
                  <strong>Withdrawable:</strong> After customer confirms
                  delivery
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="text-emerald-600 mt-0.5" />
                <span>
                  <strong>Payouts:</strong> Processed within 24 hours to your
                  bank
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
              >
                <Icon size={36} />
              </div>
              <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
              <p className="text-4xl font-bold text-slate-900 mt-3">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={() => setShowWithdrawModal(true)}
          disabled={!isVerified || walletData.availableBalance === 0}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-10 py-6 rounded-2xl font-bold text-xl shadow-xl transition-all flex items-center justify-center gap-4 disabled:cursor-not-allowed"
        >
          <Download size={32} />
          Withdraw Available Funds
        </button>
        <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-10 py-6 rounded-2xl font-bold text-xl shadow-xl transition-all flex items-center justify-center gap-4">
          <Calendar size={32} />
          View Earnings Report
        </button>
      </div>

      {/* Transactions Table */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          Recent Transactions
        </h2>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-8 py-6 text-right text-sm font-bold text-slate-700 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <span className="font-medium text-slate-900">
                        {txn.id}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-medium text-slate-900">
                        {txn.description}
                      </p>
                      {txn.availableAt && (
                        <p className="text-xs text-amber-700 mt-2 flex items-center gap-1">
                          <Clock size={14} />
                          Available: {txn.availableAt}
                        </p>
                      )}
                    </td>
                    <td className="px-8 py-6 text-slate-600">
                      <p>{txn.date}</p>
                      <p className="text-sm text-slate-500">{txn.time}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                          txn.status === "completed"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {txn.status === "completed" ? (
                          <>
                            <CheckCircle size={16} />
                            Completed
                          </>
                        ) : (
                          <>
                            <Clock size={16} />
                            Pending
                          </>
                        )}
                      </span>
                    </td>
                    <td
                      className={`px-8 py-6 text-right text-xl font-bold ${
                        txn.amount > 0 ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      <div className="flex items-center justify-end gap-2">
                        {txn.amount > 0 ? (
                          <ArrowUpRight
                            size={24}
                            className="text-emerald-600"
                          />
                        ) : (
                          <ArrowDownLeft size={24} className="text-red-600" />
                        )}
                        {txn.amount > 0 ? "+" : ""}₦
                        {Math.abs(txn.amount).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Earnings Chart Placeholder */}
      <div className="bg-white rounded-3xl border border-slate-200 p-10 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-900">
            Earnings Overview
          </h3>
          <TrendingUp size={32} className="text-emerald-600" />
        </div>
        <div className="h-80 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300">
          <div className="text-center">
            <DollarSign size={80} className="mx-auto text-slate-400 mb-6" />
            <p className="text-2xl font-bold text-slate-600">
              Monthly Earnings Chart
            </p>
            <p className="text-slate-500 mt-3">
              Visualize your income growth over time
            </p>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="p-8 border-b border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-slate-900">
                  Withdraw Funds
                </h2>
                <button
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setWithdrawAmount("");
                  }}
                  className="p-3 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={32} className="text-slate-600" />
                </button>
              </div>
            </div>

            <form onSubmit={handleWithdraw} className="p-8 space-y-8">
              {/* Available Balance */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 p-8 rounded-3xl text-center">
                <p className="text-emerald-700 font-medium mb-3">
                  Available for Withdrawal
                </p>
                <p className="text-5xl font-bold text-emerald-900">
                  ₦{walletData.availableBalance.toLocaleString()}
                </p>
              </div>

              {/* Bank Info */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 p-6 rounded-2xl">
                <div className="flex items-center gap-4">
                  <Banknote size={48} className="text-slate-600" />
                  <div>
                    <p className="text-slate-600 text-sm">
                      Funds will be sent to:
                    </p>
                    <p className="text-xl font-bold text-slate-900">
                      GTBank ••••1234
                    </p>
                    <p className="text-slate-600">Account Name: John Doe</p>
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-lg font-medium text-slate-700 mb-4">
                  Amount to Withdraw (₦) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full px-8 py-6 text-2xl font-bold rounded-2xl border-2 border-slate-300 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="0"
                  min="1000"
                  max={walletData.availableBalance}
                  required
                />
                <p className="text-sm text-slate-500 mt-3">
                  Minimum withdrawal: ₦1,000
                </p>
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-4">
                {[25, 50, 75, 100].map((percent) => {
                  const amount = Math.floor(
                    (walletData.availableBalance * percent) / 100
                  );
                  return (
                    <button
                      key={percent}
                      type="button"
                      onClick={() => setWithdrawAmount(amount.toString())}
                      className="bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg"
                    >
                      {percent}%
                    </button>
                  );
                })}
              </div>

              {/* Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-2xl">
                <p className="text-blue-800 flex items-start gap-3">
                  <AlertCircle size={20} className="mt-0.5" />
                  <span>
                    Withdrawals are processed within <strong>24 hours</strong>{" "}
                    during business days. You’ll receive a notification when the
                    transfer is completed.
                  </span>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-6 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setWithdrawAmount("");
                  }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-6 rounded-2xl font-bold text-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-6 rounded-2xl font-bold text-xl transition-all shadow-xl flex items-center justify-center gap-4"
                >
                  <Download size={32} />
                  Withdraw Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
