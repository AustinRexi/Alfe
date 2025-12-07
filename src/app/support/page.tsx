"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  Paperclip,
  Clock,
  CheckCircle,
  AlertCircle,
  Headphones,
  BookOpen,
  Shield,
  X,
} from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: "open" | "in-progress" | "resolved";
  priority: "low" | "normal" | "high";
  createdAt: string;
  lastResponse: string;
  messages: number;
  description: string;
}

interface TicketFormData {
  subject: string;
  category: string;
  description: string;
  priority: "low" | "normal" | "high";
}

export default function Support() {
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [ticketData, setTicketData] = useState<TicketFormData>({
    subject: "",
    category: "",
    description: "",
    priority: "normal",
  });

  const tickets: Ticket[] = [
    {
      id: "TKT-001",
      subject: "Payment not received for completed order",
      category: "Payment Issues",
      status: "open",
      priority: "high",
      createdAt: "2024-12-01 10:30",
      lastResponse: "2024-12-01 14:20",
      messages: 3,
      description:
        "I completed order ORD-2024-003 two days ago but haven't received payment yet.",
    },
    {
      id: "TKT-002",
      subject: "How to update product images?",
      category: "Product Management",
      status: "resolved",
      priority: "normal",
      createdAt: "2024-11-30 09:15",
      lastResponse: "2024-11-30 11:45",
      messages: 5,
      description: "Need help updating product images for my uploaded designs.",
    },
    {
      id: "TKT-003",
      subject: "Customer changed measurements after acceptance",
      category: "Order Issues",
      status: "in-progress",
      priority: "high",
      createdAt: "2024-11-29 16:00",
      lastResponse: "2024-11-30 09:30",
      messages: 7,
      description:
        "Customer wants to change measurements after I already started working.",
    },
  ];

  const categories = [
    "Order Issues",
    "Payment Issues",
    "Product Management",
    "Account Issues",
    "Technical Support",
    "General Inquiry",
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Support Ticket Created Successfully!\n\n` +
        `Ticket ID: TKT-${String(tickets.length + 1).padStart(3, "0")}\n` +
        `Subject: ${ticketData.subject}\n` +
        `Priority: ${ticketData.priority.toUpperCase()}\n\n` +
        `Our support team will respond within 2-4 hours during business hours.\n` +
        `You’ll receive a notification when we reply.`
    );
    setShowNewTicket(false);
    setTicketData({
      subject: "",
      category: "",
      description: "",
      priority: "normal",
    });
  };

  const getStatusBadge = (status: Ticket["status"]) => {
    const styles = {
      open: "bg-blue-100 text-blue-900 border-blue-200",
      "in-progress": "bg-amber-100 text-amber-900 border-amber-200",
      resolved: "bg-emerald-100 text-emerald-900 border-emerald-200",
    };
    return styles[status];
  };

  const getPriorityColor = (priority: Ticket["priority"]) => {
    const colors = {
      high: "text-red-600",
      normal: "text-slate-600",
      low: "text-slate-400",
    };
    return colors[priority];
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-4xl font-bold text-slate-900">Support Center</h1>
        <p className="text-xl text-slate-600 mt-3">
          We’re here to help you succeed
        </p>
      </div>

      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
            <Headphones size={36} />
          </div>
          <h3 className="text-2xl font-bold mb-3">Live Chat Support</h3>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Get instant help from our support team — available 8AM to 8PM daily
          </p>
          <button className="bg-white text-blue-900 px-6 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg">
            Start Chat Now
          </button>
        </div>

        <div className="group bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
            <BookOpen size={36} />
          </div>
          <h3 className="text-2xl font-bold mb-3">Help Center & FAQs</h3>
          <p className="text-emerald-100 mb-6 leading-relaxed">
            Browse guides, tutorials, and answers to common questions
          </p>
          <button className="bg-white text-emerald-600 px-6 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-lg">
            Browse Knowledge Base
          </button>
        </div>

        <div className="group bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
            <Shield size={36} />
          </div>
          <h3 className="text-2xl font-bold mb-3">Fast Response Time</h3>
          <div className="space-y-3 text-purple-100">
            <p className="text-lg">
              Average response:{" "}
              <span className="font-bold text-white">2-4 hours</span>
            </p>
            <div className="text-sm opacity-90">
              <p className="flex items-center gap-2">
                <Clock size={16} /> Mon–Fri: 8:00 AM – 8:00 PM
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} /> Sat–Sun: 10:00 AM – 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Your Support Tickets
          </h2>
          <button
            onClick={() => setShowNewTicket(true)}
            className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white px-8 py-5 rounded-xl font-bold shadow-xl transition-all flex items-center gap-3 hover:shadow-2xl"
          >
            <MessageSquare size={24} />
            Create New Ticket
          </button>
        </div>

        <div className="space-y-6">
          {tickets.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-lg">
              <MessageSquare
                size={64}
                className="mx-auto text-slate-300 mb-6"
              />
              <p className="text-xl font-medium text-slate-500">
                No tickets yet
              </p>
              <p className="text-slate-400 mt-3">
                When you create a ticket, it will appear here
              </p>
            </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-3xl border border-slate-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-bold text-slate-900">
                        {ticket.subject}
                      </h3>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusBadge(
                          ticket.status
                        )}`}
                      >
                        {ticket.status === "in-progress"
                          ? "In Progress"
                          : ticket.status.charAt(0).toUpperCase() +
                            ticket.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {ticket.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="font-medium text-slate-700">
                        {ticket.id}
                      </span>
                      <span>•</span>
                      <span>{ticket.category}</span>
                      <span>•</span>
                      <span
                        className={`font-medium ${getPriorityColor(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority.toUpperCase()} Priority
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-2">
                        <MessageSquare size={16} />
                        {ticket.messages} messages
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <div className="text-sm text-slate-500 space-y-1">
                    <p className="flex items-center gap-2">
                      <Clock size={16} /> Created: {ticket.createdAt}
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-emerald-600" />{" "}
                      Last response: {ticket.lastResponse}
                    </p>
                  </div>
                  <button className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-lg flex items-center gap-3">
                    View Conversation
                    <MessageSquare size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicket && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-8 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-900">
                Create Support Ticket
              </h2>
              <button
                onClick={() => setShowNewTicket(false)}
                className="p-3 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={32} className="text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={ticketData.category}
                    onChange={(e) =>
                      setTicketData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-6 py-5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all text-lg"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Priority Level <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-6">
                    {(["low", "normal", "high"] as const).map((level) => (
                      <label
                        key={level}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="priority"
                          value={level}
                          checked={ticketData.priority === level}
                          onChange={(e) =>
                            setTicketData((prev) => ({
                              ...prev,
                              priority: e.target.value as typeof level,
                            }))
                          }
                          className="w-6 h-6 text-blue-900 focus:ring-blue-900"
                        />
                        <span
                          className={`font-medium capitalize ${
                            level === "high"
                              ? "text-red-600"
                              : level === "low"
                              ? "text-slate-500"
                              : "text-slate-700"
                          }`}
                        >
                          {level === "normal" ? "Medium" : level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={ticketData.subject}
                  onChange={(e) =>
                    setTicketData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  className="w-full px-6 py-5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all text-lg"
                  placeholder="Brief summary of your issue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Full Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={ticketData.description}
                  onChange={(e) =>
                    setTicketData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={8}
                  className="w-full px-6 py-5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all resize-none text-lg"
                  placeholder="Please explain your issue in detail. Include order IDs, dates, screenshots if possible..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Attachments (Optional)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="ticket-attachments"
                  />
                  <label
                    htmlFor="ticket-attachments"
                    className="cursor-pointer"
                  >
                    <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Paperclip size={40} className="text-blue-900" />
                    </div>
                    <p className="text-lg font-medium text-slate-700">
                      Click to upload files
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      Screenshots, order confirmations, videos, documents
                    </p>
                  </label>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-2xl">
                <p className="text-blue-800 flex items-start gap-3">
                  <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Response Time:</strong> Our team typically responds
                    within <strong>2-4 hours</strong> during business hours. For
                    urgent issues affecting orders or payments, please use Live
                    Chat.
                  </span>
                </p>
              </div>

              <div className="flex gap-6 pt-8 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNewTicket(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-6 rounded-xl font-bold text-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white py-6 rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-4"
                >
                  <Send size={28} />
                  Submit Support Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
