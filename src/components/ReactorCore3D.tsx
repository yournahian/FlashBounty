"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GitPullRequest, CheckCircle2, ArrowUpRight, Zap, ShieldCheck, Terminal, Cpu } from "lucide-react";

interface ReactorCore3DProps {
  onPRClick?: () => void;
}

export default function ReactorCore3D({ onPRClick }: ReactorCore3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prVerified, setPrVerified] = useState(true);

  // Mouse tilt coordinates for 3D perspective
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const translateZ = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-[520px] w-full max-w-[620px] items-center justify-center [perspective:1200px]"
    >
      {/* 1. Large Ethereal Orbital Halo Ring Behind the Reactor (Matching the celestial ring in the reference) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[440px] w-[440px] sm:h-[480px] sm:w-[480px] rounded-full border border-cyan-400/20 shadow-[0_0_60px_rgba(0,245,212,0.15)]">
          {/* Outer dashed orbital guide */}
          <div className="absolute inset-[-12px] rounded-full border border-dashed border-purple-500/20 animate-orbit" />
          
          {/* Subtle celestial degree marks */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#070b22]/90 border border-cyan-500/30 text-[9px] font-mono text-[#00F5D4] tracking-widest">
            360° RISC-V CYCLE
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#070b22]/90 border border-purple-500/30 text-[9px] font-mono text-purple-300 tracking-widest">
            ZERO ORACLES
          </div>

          {/* Glowing orbital nodes */}
          <div className="absolute top-1/4 -left-2 h-2.5 w-2.5 rounded-full bg-[#00F5D4] shadow-[0_0_12px_#00F5D4] animate-ping" />
          <div className="absolute bottom-1/3 -right-2 h-2.5 w-2.5 rounded-full bg-[#7B2CBF] shadow-[0_0_12px_#7B2CBF]" />
        </div>
      </div>

      {/* 2. Floating Interactive 3D Reactor Core Assembly */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 flex items-center justify-center"
      >
        {/* Core Glow Aura */}
        <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-[#00F5D4]/20 via-[#7B2CBF]/30 to-transparent blur-3xl opacity-70 animate-pulse-glow" />

        {/* Photorealistic 3D Reactor Sphere Image with Mask & Glass Framing */}
        <div className="relative h-[340px] w-[340px] sm:h-[390px] sm:w-[390px] rounded-full p-2">
          {/* Spinning inner quantum ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#00F5D4]/30 border-t-[#00F5D4] border-r-transparent animate-orbit" />
          <div className="absolute inset-3 rounded-full border border-purple-400/40 border-b-purple-400 border-l-transparent animate-orbit-reverse" />

          {/* Central Reactor Image with circular framing & shadow */}
          <div className="relative h-full w-full overflow-hidden rounded-full border border-white/20 shadow-[0_0_50px_rgba(0,245,212,0.35)] transition-transform duration-500 group-hover:scale-105">
            <Image
              src="/reactor-core.jpg"
              alt="Rialo RISC-V Reactor Core"
              fill
              sizes="(max-width: 768px) 340px, 400px"
              priority
              className="object-cover scale-105 transition-all duration-700 hover:scale-110"
            />
            {/* Luminous overlay gradient */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#050816]/20 to-[#050816]/60 pointer-events-none" />
          </div>

          {/* Floating Telemetry Badge on Bottom of Reactor */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full glass-panel px-3.5 py-1 border border-cyan-400/40 shadow-[0_0_20px_rgba(0,245,212,0.3)] z-20"
          >
            <Cpu className="h-3.5 w-3.5 text-[#00F5D4] animate-pulse" />
            <span className="font-mono text-[10px] tracking-wider text-cyan-200">
              RISC-V VM: <span className="text-[#00F5D4] font-semibold">ONLINE</span> (0.42ms)
            </span>
          </motion.div>
        </div>

        {/* 3. Floating Preview Card (Positioned top-right, matching 'Sky City' card in reference) */}
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            translateZ: 50,
          }}
          initial={{ opacity: 0, x: 30, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          whileHover={{ scale: 1.04, y: -4 }}
          onClick={() => {
            setPrVerified(!prVerified);
            onPRClick?.();
          }}
          className="absolute -top-6 -right-4 sm:-top-8 sm:-right-8 z-30 cursor-pointer rounded-2xl glass-panel p-3.5 sm:p-4 border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-[#00F5D4]/60 group w-[220px] sm:w-[250px]"
        >
          <div className="flex items-start gap-3">
            {/* PR Thumbnail / Diff icon */}
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00F5D4]/20 to-[#7B2CBF]/40 border border-[#00F5D4]/40 shadow-[0_0_15px_rgba(0,245,212,0.3)]">
              <GitPullRequest className="h-5 w-5 text-[#00F5D4]" />
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#090d24] shadow-[0_0_6px_#10b981]" />
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-cyan-300/80 font-medium tracking-tight">
                  PR #1 · React Bugfix
                </span>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors group-hover:bg-[#00F5D4] group-hover:text-slate-950">
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>

              <div className="mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-white tracking-wide truncate">
                  Status: Verified
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-1.5">
                <span className="text-[10px] font-mono text-slate-400">Bounty Payout</span>
                <span className="text-xs font-bold text-[#00F5D4] font-mono drop-shadow-[0_0_8px_rgba(0,245,212,0.6)]">
                  3,500 USDC
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between rounded-lg bg-black/40 px-2.5 py-1 text-[9px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-[#00F5D4]">
              <Zap className="h-2.5 w-2.5" /> Rialo HTTPS Call
            </span>
            <span>2.1s Finality</span>
          </div>
        </motion.div>

        {/* 4. Secondary Floating Micro-Badge (Bottom Left of the Core) */}
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            translateZ: 35,
          }}
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-8 z-20 rounded-xl glass-panel px-3.5 py-2 border border-white/15 shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex items-center gap-2.5"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7B2CBF]/30 border border-[#7B2CBF]/50 text-[#c77dff]">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white">Cryptographic Proof</div>
            <div className="text-[9px] font-mono text-slate-400">No Oracles · Deterministic</div>
          </div>
        </motion.div>
      </motion.div>

      {/* 5. Floating satellite shards / crystals around the reactor (Mirroring small islands in reference) */}
      <div className="pointer-events-none absolute top-12 left-6 h-3 w-3 rounded-sm bg-[#00F5D4]/40 rotate-45 animate-float-slow blur-[0.5px]" />
      <div className="pointer-events-none absolute bottom-16 right-4 h-4 w-4 rounded-sm bg-purple-500/40 rotate-12 animate-float-reverse blur-[0.5px]" />
      <div className="pointer-events-none absolute top-1/2 -right-6 h-2 w-2 rounded-full bg-cyan-300/60 animate-ping" />
    </div>
  );
}
