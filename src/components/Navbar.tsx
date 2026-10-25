"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";

interface NavbarProps {
  onOpenSandbox?: () => void;
  onOpenArchitecture?: () => void;
}

export default function Navbar({ onOpenSandbox }: NavbarProps) {
  const [activeTab, setActiveTab] = useState("Home");
  const navItems = ["Home", "About", "Products", "Blog", "Contact"];

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-30 w-full px-6 py-6 md:px-12 lg:px-20"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        {/* Brand Logo - Top Left */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          {/* Reference 4-Pointed Sparkle Star */}
          <div className="relative flex h-5 w-5 items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4.5 w-4.5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-transform duration-300 group-hover:rotate-45"
            >
              <path
                d="M12 1L14.6 9.4L23 12L14.6 14.6L12 23L9.4 14.6L1 12L9.4 9.4L12 1Z"
                fill="currentColor"
              />
              <circle cx="12" cy="12" r="2" fill="#0c0e18" />
            </svg>
          </div>

          <span className="font-editorial text-xs sm:text-sm font-light tracking-[0.32em] text-white/95 uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            FLASHBOUNTY{" "}
          </span>
        </div>

        {/* Center Navigation Links with Active Dot */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`relative text-xs tracking-wider transition-colors duration-200 font-light ${
                  isActive
                    ? "text-white font-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
                    : "text-white/60 hover:text-white/90"
                }`}
              >
                {item}
                {isActive && (
                  <motion.span
                    layoutId="navbarActiveDot"
                    className="absolute -bottom-2.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Top-Right: Circular Compass Icon + Pill CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSandbox}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md text-white/75 transition-all duration-200 hover:text-white hover:border-white/30 hover:bg-white/[0.12] shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
            title="Celestial Compass"
          >
            <Compass className="h-3.5 w-3.5 stroke-[1.5]" />
          </button>

          <button
            onClick={onOpenSandbox}
            className="group flex items-center gap-2 rounded-full bg-white pl-4 pr-1.5 py-1.5 text-xs font-normal text-slate-950 transition-all duration-200 hover:bg-slate-100 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          >
            <span className="tracking-wide text-xs font-medium">Get Started</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 text-white transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight className="h-2.5 w-2.5 stroke-[2]" />
            </div>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
