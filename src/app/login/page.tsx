// app/login/page.tsx
"use client";

import React, { useState } from "react";
import { LogIn, Mail, Lock, UserPlus } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Login/Signup attempt:", {
        email,
        password,
        isSignUp,
        rememberMe,
      });
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Brand */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700 text-white px-8 py-4 rounded-2xl shadow-xl mb-4">
            <h1 className="text-4xl font-bold tracking-tight">OneFit</h1>
          </div>
          <p className="text-lg text-slate-600 font-medium">Vendor Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {isSignUp ? "Create Your Account" : "Welcome Back"}
            </h2>
            <p className="text-slate-600">
              {isSignUp
                ? "Start managing your fashion business today"
                : "Sign in to access your vendor dashboard"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all bg-slate-50/50 placeholder:text-slate-400"
                  placeholder="vendor@onefit.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all bg-slate-50/50 placeholder:text-slate-400"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-900 border-slate-300 rounded focus:ring-blue-900 cursor-pointer"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-slate-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-blue-900 hover:underline font-medium transition-colors"
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold py-4 rounded-xl hover:from-blue-800 hover:to-blue-600 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : isSignUp ? (
                <>
                  <UserPlus size={22} />
                  <span>Create Account</span>
                </>
              ) : (
                <>
                  <LogIn size={22} />
                  <span>Sign In Securely</span>
                </>
              )}
            </button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account yet?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-semibold text-blue-900 hover:text-blue-700 underline underline-offset-4 transition-colors"
                disabled={isLoading}
              >
                {isSignUp ? "Sign In" : "Sign Up Free"}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-8 max-w-sm mx-auto leading-relaxed">
          By continuing, you agree to OneFit{" "}
          <a href="#" className="underline hover:text-slate-700">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-slate-700">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
