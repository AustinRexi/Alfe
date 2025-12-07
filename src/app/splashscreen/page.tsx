// src/app/splashscreen/page.tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function SplashScreen() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="bg-white rounded-3xl px-14 py-8 shadow-2xl inline-flex items-center gap-4 justify-center">
            <Sparkles className="w-10 h-10 text-blue-800 animate-pulse" />
            <h1 className="text-6xl font-black bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              OneFit
            </h1>
          </div>
        </motion.div>

        {/* Vendor Portal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-10"
        >
          <p className="text-white text-2xl font-light tracking-widest uppercase">
            Vendor Portal
          </p>
        </motion.div>

        {/* Bouncing Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex gap-3 justify-center mb-12"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-teal-400 rounded-full shadow-lg"
              animate={{
                y: [0, -20, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-blue-200 text-lg font-medium tracking-wide"
        >
          Crafting Excellence, One Stitch at a Time
        </motion.p>
      </motion.div>

      {/* Floating Orbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.5, duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-20 w-80 h-80 bg-teal-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-rose-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-30 animate-pulse" />
      </motion.div>
    </div>
  );
}
