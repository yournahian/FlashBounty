"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Users, Search, Bell, ArrowUpRight, ShieldCheck, Lock, Sparkles } from "lucide-react";

export default function BentoGridSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Scroll-linked parallax effects for the background image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.0, 1.04]);

  return (
    <section
      ref={sectionRef}
      id="infrastructure"
      className="relative z-10 w-full py-28 sm:py-36 px-6 md:px-12 lg:px-20 overflow-hidden isolate bg-[#060814]"
    >
      {/* ======================================================== */}
      {/* 1. FIT-COVERED BACKGROUND IMAGE WITH DARKENING OVERLAY   */}
      {/* ======================================================== */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden isolate [contain:paint]">
        {/* Parallax Background Image */}
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 w-full h-full">
          <Image
            src="/bento-bg.png"
            alt="Cosmic Twilight Sky Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Darkening overlay so the light violet to light gray elements and text stand out crisply */}
        <div className="absolute inset-0 bg-[#070914]/75 backdrop-blur-[2px]" />
        
        {/* Top and Bottom soft fade vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050711] via-transparent to-[#050711]" />

        {/* Subtle luminous ambient violet & pink auras */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 h-[550px] w-[550px] rounded-full bg-purple-600/15 blur-[160px]" />
        <div className="absolute bottom-16 right-1/4 h-[500px] w-[500px] rounded-full bg-pink-500/12 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px]">
        
        {/* ======================================================== */}
        {/* SECTION HEADER: Scroll-Triggered Blur-to-Sharp Reveal    */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          {/* Subtle Tag Pill */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono tracking-widest text-[#E0B0FF] uppercase mb-4 border border-white/15 bg-white/[0.05] backdrop-blur-xl shadow-inner">
            <Sparkles className="h-3 w-3 text-[#C084FC]" />
            <span>RIALO VERIFIED ARCHITECTURE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight text-white mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EFE7FE] to-[#D8B4FE]">
              Native Web3 Infrastructure
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            From code commit to instant cryptographic payout, our native RISC-V infrastructure eliminates oracles and automates Web3 bounty settlements.
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* BENTO GRID: Staggered Scroll Reveals & Light Violet/Gray */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Tall Card 1 + Bottom Card 5 (lg:col-span-4) */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6">
            
            {/* CARD 1 (Top Left, Tall): RISC-V Micro-VMs */}
            <motion.div
              initial={{ opacity: 0, y: 45, rotateY: -4, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative flex flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:p-8 min-h-[460px] group cursor-pointer backdrop-blur-2xl bg-white/[0.04] border border-white/[0.14] hover:bg-white/[0.08] hover:border-violet-300/40 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all"
            >
              {/* Card Ambient Glow Aura */}
              <div className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-violet-400/15 via-transparent to-transparent" />

              {/* 3D Visual Artwork at Top: Light Violet to Light Gray Binoculars */}
              <div className="relative flex items-center justify-center pt-2 pb-6 w-full h-52">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative flex items-center justify-center transform -rotate-12 transition-transform duration-700"
                >
                  {/* Left Barrel */}
                  <div className="relative h-32 w-16 rounded-2xl bg-gradient-to-b from-[#f3e8ff] via-[#e9d5ff] to-[#cbd5e1] shadow-[0_18px_32px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(255,255,255,0.95)] border border-white/70 flex flex-col items-center justify-between p-2 overflow-hidden">
                    <div className="h-5 w-full rounded-lg bg-[#ede9fe] border border-white/60 shadow-inner" />
                    {/* Glossy Pearlescent Lens */}
                    <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#cbd5e1] via-[#f1f5f9] to-[#ffffff] border-2 border-white/80 flex items-center justify-center shadow-md">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#c084fc]/50 to-[#818cf8]/40 blur-[1px] shadow-inner" />
                    </div>
                  </div>

                  {/* Central Hinge & Focus Dial */}
                  <div className="h-14 w-7 bg-gradient-to-b from-[#f5f3ff] via-[#e2e8f0] to-[#cbd5e1] -mx-1 z-10 rounded-md border-y border-white/60 shadow-xl flex flex-col items-center justify-center gap-1">
                    <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#c084fc] to-[#e2e8f0] border border-white/80 shadow-md" />
                    <div className="h-1 w-3 bg-white/60 rounded-full" />
                  </div>

                  {/* Right Barrel */}
                  <div className="relative h-32 w-16 rounded-2xl bg-gradient-to-b from-[#f3e8ff] via-[#e9d5ff] to-[#cbd5e1] shadow-[0_18px_32px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(255,255,255,0.95)] border border-white/70 flex flex-col items-center justify-between p-2 overflow-hidden">
                    <div className="h-5 w-full rounded-lg bg-[#ede9fe] border border-white/60 shadow-inner" />
                    {/* Glossy Pearlescent Lens */}
                    <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#cbd5e1] via-[#f1f5f9] to-[#ffffff] border-2 border-white/80 flex items-center justify-center shadow-md">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#c084fc]/50 to-[#818cf8]/40 blur-[1px] shadow-inner" />
                    </div>
                  </div>
                  {/* Subtle depth shadow */}
                  <div className="absolute -bottom-3 inset-x-2 h-6 bg-black/40 blur-lg rounded-full -z-10" />
                </motion.div>
              </div>

              {/* Bottom Text Content */}
              <div className="relative z-10 pt-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm group-hover:text-violet-200 transition-colors">
                    RISC-V Micro-VMs
                  </h3>
                  <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  Execute deterministic off-chain code inside secure RISC-V micro-VMs with native HTTPS execution and zero external oracles.
                </p>
              </div>
            </motion.div>

            {/* CARD 5 (Bottom Left): Live Commit Telemetry / Bell */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotateZ: -2 }}
              whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="relative flex items-center justify-between overflow-hidden rounded-[28px] p-7 sm:p-8 min-h-[200px] group cursor-pointer backdrop-blur-2xl bg-white/[0.04] border border-white/[0.14] hover:bg-white/[0.08] hover:border-violet-300/40 shadow-[0_18px_45px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all"
            >
              <div className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-violet-400/15 via-transparent to-transparent" />

              {/* Left Text */}
              <div className="relative z-10 max-w-[60%]">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider">Live Stream</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-violet-200 transition-colors">
                  Live Commit Telemetry
                </h3>
                <p className="text-xs text-slate-300 font-normal leading-relaxed">
                  Real-time tracking of developer pull requests and automated event-driven triggers.
                </p>
              </div>

              {/* Right 3D Visual: Light Violet to Light Gray Bell */}
              <div className="relative h-28 w-28 flex items-center justify-center shrink-0">
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="relative transform transition-transform duration-500"
                >
                  {/* Bell Body */}
                  <div className="relative h-20 w-20 rounded-t-full bg-gradient-to-b from-[#fdfcff] via-[#ede9fe] to-[#cbd5e1] border border-white/70 shadow-[0_16px_28px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(255,255,255,0.95)] flex items-end justify-center pb-1.5">
                    {/* Flared Rim */}
                    <div className="absolute -bottom-2 h-3.5 w-24 rounded-full bg-gradient-to-r from-[#e2e8f0] via-[#ffffff] to-[#e2e8f0] border border-white/70 shadow-md" />
                    {/* Clapper */}
                    <div className="absolute -bottom-4 h-5 w-5 rounded-full bg-gradient-to-b from-[#c084fc] to-[#64748b] border border-white/60 shadow-inner" />
                  </div>
                  {/* Top Loop */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-4 w-5 rounded-t-full border-2 border-white/80" />
                  <div className="absolute -bottom-4 inset-x-0 h-4 bg-black/35 blur-md rounded-full -z-10" />
                </motion.div>
              </div>
            </motion.div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Top Wide Card 2 + Middle Row + Bottom Card 6 */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6">
            
            {/* CARD 2 (Top Right, Wide): Instant PR Verification / Bullseye */}
            <motion.div
              initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="relative flex flex-col sm:flex-row items-center justify-between overflow-hidden rounded-[28px] p-7 sm:p-8 min-h-[240px] group cursor-pointer gap-6 backdrop-blur-2xl bg-white/[0.04] border border-white/[0.14] hover:bg-white/[0.08] hover:border-violet-300/40 shadow-[0_18px_45px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all"
            >
              <div className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-violet-400/15 via-transparent to-transparent" />

              {/* Left Text */}
              <div className="relative z-10 max-w-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-mono text-purple-300 border border-violet-500/30">
                    &lt; 240ms Finality
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2.5 group-hover:text-violet-200 transition-colors">
                  Instant PR Verification
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  Verify GitHub pull requests in sub-second latency using direct off-chain TLS sockets and cryptographic proofs.
                </p>
              </div>

              {/* Right 3D Visual: Light Violet to Light Gray Target Bullseye & Arrow */}
              <div className="relative h-44 w-44 shrink-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 240, damping: 20 }}
                  className="relative transform transition-transform duration-700"
                >
                  {/* Outer Rim */}
                  <div className="h-36 w-36 rounded-full bg-gradient-to-br from-[#f3e8ff] via-[#e2e8f0] to-[#cbd5e1] border border-white/70 shadow-[0_20px_35px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(255,255,255,0.95)] flex items-center justify-center">
                    {/* Ring 2 */}
                    <div className="h-26 w-26 rounded-full bg-gradient-to-br from-[#ddd6fe] to-[#e2e8f0] border border-white/50 flex items-center justify-center shadow-inner">
                      {/* Ring 3 */}
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#ede9fe] to-[#cbd5e1] border border-white/60 flex items-center justify-center">
                        {/* Bullseye Core */}
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#c084fc] to-[#e2e8f0] border border-white/80 shadow-md" />
                      </div>
                    </div>
                  </div>

                  {/* 3D Arrow Shaft & Fletching */}
                  <div className="absolute top-2 right-2 h-20 w-3 bg-gradient-to-b from-[#ffffff] via-[#e2e8f0] to-[#c084fc] rotate-45 rounded-full shadow-xl border-t border-white/80" />
                  <div className="absolute -top-1 -right-1 h-6 w-6 border-r-3 border-t-3 border-white/80 rotate-45" />
                  <div className="absolute -bottom-2 inset-x-2 h-6 bg-black/40 blur-lg rounded-full -z-10" />
                </motion.div>
              </div>
            </motion.div>

            {/* MIDDLE ROW: Card 3 (Escrow Vaults) + Card 4 (Zero-Oracle Security) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              
              {/* CARD 3 (Middle Left): Escrow Vaults / Avatars */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="relative flex flex-col justify-between overflow-hidden rounded-[28px] p-6 sm:p-7 min-h-[210px] group cursor-pointer backdrop-blur-2xl bg-white/[0.04] border border-white/[0.14] hover:bg-white/[0.08] hover:border-violet-300/40 shadow-[0_18px_45px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all"
              >
                <div className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-violet-400/15 via-transparent to-transparent" />

                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-violet-200 transition-colors">
                    Escrow Vaults
                  </h3>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">
                    Automated multi-sig smart contract treasury for secure, non-custodial token locking and trustless payouts.
                  </p>
                </div>

                {/* 3D Light Violet/Gray Avatars */}
                <div className="flex justify-end items-end pt-3">
                  <motion.div
                    whileHover={{ scale: 1.12, x: 3 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className="flex -space-x-3 transform transition-transform duration-500"
                  >
                    {/* Avatar 1 */}
                    <div className="h-12 w-10 rounded-t-full bg-gradient-to-b from-[#f3e8ff] via-[#e2e8f0] to-[#cbd5e1] border border-white/70 shadow-lg flex flex-col items-center pt-1.5 overflow-hidden">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-b from-[#e9d5ff] to-[#cbd5e1] border border-white/60 shadow-inner" />
                    </div>
                    {/* Avatar 2 */}
                    <div className="h-13 w-11 rounded-t-full bg-gradient-to-b from-[#ede9fe] via-[#ddd6fe] to-[#cbd5e1] border border-white/80 shadow-xl flex flex-col items-center pt-1.5 overflow-hidden z-10">
                      <div className="h-5.5 w-5.5 rounded-full bg-gradient-to-b from-[#c084fc] to-[#e2e8f0] border border-white/80 shadow-md" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* CARD 4 (Middle Right): Zero-Oracle Security / Magnifying Glass */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="relative flex flex-col justify-between overflow-hidden rounded-[28px] p-6 sm:p-7 min-h-[210px] group cursor-pointer backdrop-blur-2xl bg-white/[0.04] border border-white/[0.14] hover:bg-white/[0.08] hover:border-violet-300/40 shadow-[0_18px_45px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all"
              >
                <div className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-violet-400/15 via-transparent to-transparent" />

                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-violet-200 transition-colors">
                    Zero-Oracle Security
                  </h3>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">
                    Eliminate centralized third-party risk with native TLS 1.3 handshakes directly connected to Git servers.
                  </p>
                </div>

                {/* 3D Light Violet/Gray Magnifying Glass */}
                <div className="flex justify-end items-end pt-3">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className="relative h-14 w-14 flex items-center justify-center transform transition-transform duration-500"
                  >
                    {/* Rim */}
                    <div className="h-11 w-11 rounded-full border-4 border-[#e2e8f0] bg-gradient-to-tr from-[#ede9fe] via-[#ffffff] to-[#cbd5e1] shadow-lg flex items-center justify-center">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#c084fc]/30 to-[#818cf8]/20 blur-[1px]" />
                    </div>
                    {/* Handle */}
                    <div className="absolute -bottom-1 -right-1 h-6 w-2.5 bg-gradient-to-b from-[#ffffff] via-[#e2e8f0] to-[#94a3b8] rounded-full rotate-45 border-t border-white/80 shadow-md" />
                  </motion.div>
                </div>
              </motion.div>

            </div>

            {/* CARD 6 (Bottom Right, Wide): Sub-Second Latency Metrics / Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="relative flex items-center justify-between overflow-hidden rounded-[28px] p-6 sm:p-7 min-h-[160px] group cursor-pointer backdrop-blur-2xl bg-white/[0.04] border border-white/[0.14] hover:bg-white/[0.08] hover:border-violet-300/40 shadow-[0_18px_45px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all"
            >
              <div className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-violet-400/15 via-transparent to-transparent" />

              {/* Left Text */}
              <div className="relative z-10 max-w-[65%]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono text-[#00F5D4] uppercase tracking-wider">Benchmark Pass</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5 group-hover:text-violet-200 transition-colors">
                  Sub-Second Latency Metrics
                </h3>
                <p className="text-xs text-slate-300 font-normal leading-relaxed">
                  Monitor transaction finality under 240ms with 99.4% gas savings compared to legacy oracle networks.
                </p>
              </div>

              {/* Right 3D Visual: Light Violet to Light Gray 3D Pie Chart */}
              <div className="relative h-20 w-24 shrink-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative transform transition-transform duration-700"
                >
                  {/* Main Cylinder Base */}
                  <div className="relative h-16 w-20 rounded-full bg-gradient-to-b from-[#f3e8ff] via-[#e2e8f0] to-[#cbd5e1] border border-white/70 shadow-[0_14px_28px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(255,255,255,0.95)] flex items-center justify-center [transform:rotateX(55deg)]">
                    {/* Separated Floating Slice matching reference */}
                    <div className="absolute top-0.5 left-1 h-8 w-8 bg-gradient-to-br from-[#c084fc] via-[#ddd6fe] to-[#ffffff] border-t border-l border-white/80 rounded-tl-full shadow-lg transform -translate-y-2 -translate-x-1" />
                  </div>
                  <div className="absolute -bottom-2 inset-x-1 h-4 bg-black/35 blur-md rounded-full -z-10" />
                </motion.div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
