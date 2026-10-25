"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

import Navbar from "@/components/Navbar";
import ParticleCanvas from "@/components/ParticleCanvas";
import ScrollCanvasSequence from "@/components/ScrollCanvasSequence";
import FloatingPreviewCard from "@/components/FloatingPreviewCard";
import ArchitectureModal from "@/components/ArchitectureModal";
import SandboxModal from "@/components/SandboxModal";
import LogoCarouselSection from "@/components/LogoCarouselSection";
import BentoGridSection from "@/components/BentoGridSection";
import DashboardSection from "@/components/DashboardSection";

export default function HomePage() {
  const [activeStep, setActiveStep] = useState("01");
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [isSandboxModalOpen, setIsSandboxModalOpen] = useState(false);

  const heroScrollContainerRef = useRef<HTMLDivElement>(null);

  const steps = ["01", "02", "03"];

  return (
    <div className="relative w-full bg-[#050711] text-white selection:bg-purple-500/30 selection:text-white">
      {/* ======================================================== */}
      {/* 1. HERO SECTION: Scroll-Linked 150-Frame Canvas Sequence */}
      {/* ======================================================== */}
      <div ref={heroScrollContainerRef} className="relative w-full h-[250vh]">
        <section className="sticky top-0 z-10 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#060814]">
          
          {/* Layer 1: Scroll-Linked 150-Frame Cinematic HTML5 Canvas */}
          <ScrollCanvasSequence containerRef={heroScrollContainerRef} totalFrames={150} />

          {/* Gentle Celestial Lighting Enhancements */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060814]/30 via-transparent to-[#060814]/60 pointer-events-none" />
          <div className="absolute top-[20%] right-[25%] h-96 w-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[20%] left-[10%] h-96 w-96 rounded-full bg-sky-500/10 blur-[140px] pointer-events-none" />

        {/* Layer 2: Subtle Ambient Dust & Starlight Particles */}
        <ParticleCanvas />

        {/* Layer 3: Top Navigation Bar */}
        <Navbar
          onOpenSandbox={() => setIsSandboxModalOpen(true)}
          onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        />

        {/* Layer 4: Upper-Right Floating Preview Card (Positioned directly over Citadel) */}
        <div className="absolute top-[16%] right-[6%] sm:right-[10%] lg:right-[13%] xl:right-[15%] z-30 hidden md:block">
          <FloatingPreviewCard onClick={() => setIsArchitectureModalOpen(true)} />
        </div>

        {/* Layer 5: Main Editorial Content (Left-Aligned, Spacious & Clean) */}
        <div className="relative z-20 flex-1 flex items-center px-6 md:px-12 lg:px-20 py-4 md:py-8">
          <div className="mx-auto w-full max-w-[1440px]">
            
            <div className="flex flex-col items-start max-w-3xl">
              
              {/* Subtitle with Horizontal Line Prefix */}
              <motion.div
                initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3.5 mb-5 sm:mb-6"
              >
                <span className="h-[1px] w-7 sm:w-8 bg-white/70 shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                <span className="text-[10px] sm:text-[11px] font-normal tracking-[0.28em] text-white/95 uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
                  RIALO NATIVE EVENT-DRIVEN ARCHITECTURE
                </span>
              </motion.div>

              {/* Oversized Headline with Exact 2-Line Editorial Hierarchy */}
              <motion.h1
                initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[6.1rem] tracking-tight font-normal leading-[1.05] text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
              >
                <span className="block">Code, Verify, &amp; Claim.</span>
                <span className="block text-white/95">Instantly via Rialo.</span>
              </motion.h1>

              {/* Supporting Paragraph explaining GitHub PR verification & native crypto bounties */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base text-white/85 leading-relaxed font-light max-w-lg mb-8 sm:mb-9 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
              >
                Open-source developers can verify GitHub PRs and get instant crypto bounties natively without third-party oracles using Rialo&apos;s RISC-V off-chain runtime.
              </motion.p>

              {/* CTA Buttons matching reference design */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-5 sm:gap-7"
              >
                {/* Primary Pill Button */}
                <button
                  onClick={() => setIsSandboxModalOpen(true)}
                  className="group relative flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-xs sm:text-sm font-medium text-slate-950 transition-all duration-300 hover:bg-slate-100 active:scale-95 shadow-[0_0_28px_rgba(255,255,255,0.35)]"
                >
                  <span className="tracking-wide">Launch Sandbox</span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 text-white transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight className="h-3 w-3 stroke-[2]" />
                  </div>
                </button>

                {/* Secondary Frosted Play Button */}
                <button
                  onClick={() => setIsArchitectureModalOpen(true)}
                  className="group flex items-center gap-3 text-xs sm:text-sm font-light text-white/90 transition-colors duration-200 hover:text-white"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/[0.12] backdrop-blur-md text-white transition-all duration-200 group-hover:border-white/50 group-hover:bg-white/[0.22] shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <Play className="h-4 w-4 fill-white/95 ml-0.5" />
                  </div>
                  <span className="tracking-wide drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
                    Watch Architecture
                  </span>
                </button>
              </motion.div>

              {/* Delicate Accent Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.75 }}
                className="mt-8 sm:mt-10 h-[1px] w-9 bg-white/50 origin-left"
              />
            </div>

          </div>
        </div>

        {/* Layer 6: Right-Side Vertical Step Numbers (01, 02, 03) */}
        <div className="hidden lg:flex absolute right-7 xl:right-10 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3">
          {steps.map((num) => {
            const isActive = activeStep === num;
            return (
              <div key={num} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setActiveStep(num)}
                  className={`text-[11px] font-mono transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "font-medium text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)] scale-110"
                      : "font-light text-white/60 hover:text-white/90"
                  }`}
                >
                  {num}
                </button>
                {isActive && (
                  <div className="h-10 w-[1px] bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Layer 7: Bottom Editorial Elements (Thumbnail on Left, Quote on Right) */}
        <div className="relative z-20 w-full px-6 md:px-12 lg:px-20 pb-7 sm:pb-9 pt-4">
          <div className="mx-auto flex max-w-[1440px] flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            
            {/* Bottom-Left: Circular Thumbnail Widget */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              onClick={() => setIsSandboxModalOpen(true)}
              className="group flex cursor-pointer items-center gap-3.5 max-w-md"
            >
              {/* Circular Photo Thumbnail matching reference */}
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/35 bg-black/50 shadow-[0_4px_20px_rgba(0,0,0,0.7)] group-hover:border-white/60 transition-colors">
                <img
                  src="/hero-aurora-clean.jpg"
                  alt="Explore New Realms"
                  className="h-full w-full object-cover object-[25%_65%] transition-transform duration-500 group-hover:scale-115"
                />
                <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-medium text-white tracking-wide group-hover:text-purple-200 transition-colors drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                  Explore Devnet Sandbox
                </span>
                <p className="text-[11px] text-white/70 font-light leading-snug mt-0.5 drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                  From PR merge to instant crypto bounties, your next payout is just a click away.
                </p>
              </div>
            </motion.div>

            {/* Bottom-Right: Minimalist Tagline with Sparkle Icon matching reference */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-3.5 text-left sm:text-right"
            >
              {/* 4-Pointed Sparkle Star Icon matching reference */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 text-white/75 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] shrink-0"
              >
                <path
                  d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                  fill="currentColor"
                />
              </svg>

              <div className="flex flex-col">
                <div className="flex items-center sm:justify-end gap-2">
                  <span className="h-[1px] w-6 bg-white/50 hidden sm:inline-block" />
                  <span className="text-[11px] font-light tracking-wide text-white/80">
                    More than a destination
                  </span>
                </div>
                <div className="text-xs font-editorial italic text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                  — it&apos;s a feeling.
                </div>
                {/* Subtle tiny dot beneath the quote matching reference */}
                <div className="hidden sm:flex justify-end mt-0.5">
                  <span className="h-1 w-1 rounded-full bg-white/60" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </section>
      </div>

      {/* ======================================================== */}
      {/* 2. SECTION 2: Infinite Logo Marquee Carousel */}
      {/* ======================================================== */}
      <LogoCarouselSection />

      {/* ======================================================== */}
      {/* 3. SECTION 3: Asymmetric Bento Grid (What We Do Best) */}
      {/* ======================================================== */}
      <BentoGridSection />

      {/* ======================================================== */}
      {/* 4. SECTION 4: Glassmorphic Web3 Main Dashboard (360 POD) */}
      {/* ======================================================== */}
      <DashboardSection />

      {/* ======================================================== */}
      {/* 5. FOOTER: Sleek Minimalist Endplate */}
      {/* ======================================================== */}
      <footer className="relative w-full border-t border-white/[0.07] bg-[#03040a] py-12 px-8 md:px-16 text-center text-xs text-white/40">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-editorial text-sm font-medium tracking-[0.25em] text-white uppercase">
              FLASHBOUNTY
            </span>
            <span className="text-[10px] font-mono text-purple-400">· Rialo Native</span>
          </div>
          <p className="text-[11px] font-light text-white/50">
            &copy; 2026 FlashBounty Architecture. Zero third-party oracles. RISC-V cryptographic finality.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-white/60">
            <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-white cursor-pointer transition-colors">Audit Report</span>
            <span className="hover:text-white cursor-pointer transition-colors">GitHub</span>
          </div>
        </div>
      </footer>

      {/* Interactive Walkthrough & Sandbox Modals */}
      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
      <SandboxModal
        isOpen={isSandboxModalOpen}
        onClose={() => setIsSandboxModalOpen(false)}
      />

    </div>
  );
}
