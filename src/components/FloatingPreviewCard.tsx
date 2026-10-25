"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FloatingPreviewCardProps {
  onClick?: () => void;
}

export default function FloatingPreviewCard({ onClick }: FloatingPreviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onClick}
      className="cursor-pointer group flex items-center gap-3 rounded-2xl border border-white/25 bg-slate-950/45 p-2 sm:p-2.5 pr-3.5 sm:pr-4 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-slate-900/60"
    >
      {/* 2 Mini Overlapping / Adjacent Image Thumbnails matching reference */}
      <div className="flex items-center gap-1.5">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-black/40 shadow-inner">
          <img
            src="/hero-aurora-clean.jpg"
            alt="Citadel Core"
            className="h-full w-full object-cover object-[62%_32%] transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
        <div className="relative h-9 w-5 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-black/40 shadow-inner hidden sm:block">
          <img
            src="/hero-aurora-clean.jpg"
            alt="Citadel Sky"
            className="h-full w-full object-cover object-[72%_25%] transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Card Info */}
      <div className="flex flex-col pr-1">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-[13px] font-medium tracking-wide text-white group-hover:text-purple-200 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Rialo RISC-V Core
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
          <span className="text-[10px] sm:text-[11px] font-light text-white/75">
            Verified PR #1
          </span>
        </div>
      </div>

      {/* Right Circular Arrow Button matching reference */}
      <div className="ml-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/25 bg-white/[0.08] text-white/75 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-slate-950">
        <ArrowRight className="h-3 w-3 stroke-[1.75]" />
      </div>
    </motion.div>
  );
}
