// src/app/profile/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useApp } from "@/provider/AppContext";
import {
  Camera,
  CheckCircle,
  AlertCircle,
  Upload,
  MapPin,
  Building2,
  User,
  Phone,
  Mail,
  IdCard,
  Home,
} from "lucide-react";

const nigeriaStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
] as const;

const categories = [
  { value: "male", label: "Male Fashion" },
  { value: "female", label: "Female Fashion" },
  { value: "kids", label: "Kids Fashion" },
  { value: "unisex", label: "Unisex" },
  { value: "packages", label: "Packages (Bridal/Family)" },
] as const;

export default function Profile() {
  const { vendorProfile, setVendorProfile, currentPage } = useApp();

  const [formData, setFormData] = useState({
    name: vendorProfile.name || "",
    email: vendorProfile.email || "",
    phone: vendorProfile.phone || "",
    nin: vendorProfile.nin || "",
    sex: vendorProfile.sex || "",
    state: vendorProfile.state || "",
    businessAddress: vendorProfile.businessAddress || "",
    residentialAddress: vendorProfile.residentialAddress || "",
    category: vendorProfile.category || "",
    profileImage: vendorProfile.profileImage || "",
  });

  const [imagePreview, setImagePreview] = useState<string>(
    vendorProfile.profileImage || ""
  );

  const forceComplete = !vendorProfile.isComplete && currentPage === "profile";

  // Keep form in sync with context (important for refresh)
  useEffect(() => {
    setFormData({
      name: vendorProfile.name || "",
      email: vendorProfile.email || "",
      phone: vendorProfile.phone || "",
      nin: vendorProfile.nin || "",
      sex: vendorProfile.sex || "",
      state: vendorProfile.state || "",
      businessAddress: vendorProfile.businessAddress || "",
      residentialAddress: vendorProfile.residentialAddress || "",
      category: vendorProfile.category || "",
      profileImage: vendorProfile.profileImage || "",
    });
    setImagePreview(vendorProfile.profileImage || "");
  }, [vendorProfile]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setFormData((prev) => ({ ...prev, profileImage: result }));
    };
    reader.readAsDataURL(file);
  };

  const isFormComplete = (): boolean => {
    return !!(
      formData.name &&
      formData.phone &&
      formData.nin &&
      formData.sex &&
      formData.state &&
      formData.businessAddress &&
      formData.residentialAddress &&
      formData.category &&
      formData.profileImage
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile = {
      ...vendorProfile,
      ...formData,
      isComplete: isFormComplete(),
      isVerified: isFormComplete(), // In real app: send to backend for approval
    };

    // Save to context + localStorage (persists on refresh!)
    setVendorProfile(updatedProfile);
    localStorage.setItem("vendorProfile", JSON.stringify(updatedProfile));

    alert("Profile saved successfully! Your data is safe even if you refresh.");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-4xl font-bold text-slate-900">Vendor Profile</h1>
        <p className="text-lg text-slate-600 mt-3">
          {forceComplete
            ? "Complete your profile to start accepting orders and uploading designs"
            : "Manage your business information and verification status"}
        </p>
      </div>

      {/* Success Banner */}
      {vendorProfile.isComplete && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 shadow-lg flex items-center gap-5">
          <CheckCircle size={48} className="text-emerald-600" />
          <div>
            <h3 className="text-xl font-bold text-emerald-900">
              Profile Complete!
            </h3>
          </div>
        </div>
      )}

      {/* Verification Status Card */}
      <div
        className={`rounded-2xl p-6 flex items-center gap-5 shadow-lg border ${
          vendorProfile.isVerified
            ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200"
            : "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200"
        }`}
      >
        {vendorProfile.isVerified ? (
          <>
            <div className="bg-emerald-100 p-4 rounded-full">
              <CheckCircle size={32} className="text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-900">
                Profile Verified Successfully!
              </h3>
              <p className="text-emerald-700 mt-1">
                You can now accept orders, upload products, and grow your
                business
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-amber-100 p-4 rounded-full">
              <AlertCircle size={32} className="text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-900">
                Complete Your Profile
              </h3>
              <p className="text-amber-700 mt-1">
                Fill in all required fields to get verified and start selling
              </p>
            </div>
          </>
        )}
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
      >
        <div className="p-8 space-y-10">
          {/* Profile Photo */}
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-blue-100 bg-gradient-to-br from-blue-50 to-indigo-100">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Profile"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={64} className="text-slate-400" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-3 right-3 bg-blue-900 text-white p-4 rounded-full cursor-pointer shadow-lg hover:bg-blue-800 transition-all hover:scale-110">
                <Camera size={24} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-slate-900">
                Profile Photo <span className="text-red-500">*</span>
              </h3>
              <p className="text-slate-600 mt-2">
                Upload a clear, professional photo of yourself
              </p>
              <p className="text-sm text-slate-500 mt-1">
                JPG, PNG up to 5MB • Recommended: 400x400px
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <User size={28} className="text-blue-900" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <User size={18} className="inline mr-2" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  placeholder="e.g., Adeola Johnson"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Phone size={18} className="inline mr-2" />
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  placeholder="+234 801 234 5678"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Mail size={18} className="inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <IdCard size={18} className="inline mr-2" />
                  NIN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nin}
                  onChange={(e) => handleInputChange("nin", e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  placeholder="12345678901"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.sex}
                  onChange={(e) => handleInputChange("sex", e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <MapPin size={18} className="inline mr-2" />
                  State of Residence <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  required
                >
                  <option value="">Select state</option>
                  {nigeriaStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Building2 size={28} className="text-blue-900" />
              Business Information
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Building2 size={18} className="inline mr-2" />
                  Business Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.businessAddress}
                  onChange={(e) =>
                    handleInputChange("businessAddress", e.target.value)
                  }
                  rows={3}
                  className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all resize-none"
                  placeholder="Shop 12, Oba Market, Ikeja, Lagos"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Home size={18} className="inline mr-2" />
                  Residential Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.residentialAddress}
                  onChange={(e) =>
                    handleInputChange("residentialAddress", e.target.value)
                  }
                  rows={3}
                  className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all resize-none"
                  placeholder="12 Adeola Odeku Street, Victoria Island, Lagos"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tailor Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  required
                >
                  <option value="">Select your specialty</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-600 text-center sm:text-left">
              Your profile is saved automatically and will stay even after
              refresh
            </p>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center gap-3 hover:shadow-2xl"
            >
              <Upload size={24} />
              {forceComplete
                ? "Complete Profile & Get Verified"
                : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
