"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Terminal, Shield, GitPullRequest, Zap, Database, Boxes, Layers, Globe, Radio, Sparkles, Orbit, Key, Network } from "lucide-react";

interface Partner {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const row1Partners: Partner[] = [
  { name: "Rialo Network", category: "RISC-V Layer", icon: Cpu, tag: "Native VM" },
  { name: "RISC Zero", category: "ZK Proving", icon: Shield, tag: "zkVM" },
  { name: "Ethereum", category: "Settlement", icon: Boxes, tag: "L1 Escrow" },
  { name: "Solana", category: "High Throughput", icon: Zap, tag: "SVM Pipeline" },
  { name: "GitHub API", category: "Developer Hub", icon: GitPullRequest, tag: "TLS 1.3" },
  { name: "Arbitrum", category: "Rollup", icon: Layers, tag: "Nitro VM" },
  { name: "Base", category: "Optimistic", icon: Globe, tag: "OP Stack" },
  { name: "Anthropic", category: "AI Verifier", icon: Sparkles, tag: "Claude 3.5" },
  { name: "Celestia", category: "Modular DA", icon: Network, tag: "Data Availability" },
];

const row2Partners: Partner[] = [
  { name: "Chainlink", category: "Data Feeds", icon: Radio, tag: "CCIP" },
  { name: "Optimism", category: "Superchain", icon: Layers, tag: "Bedrock" },
  { name: "Polygon", category: "AggLayer", icon: Orbit, tag: "CDK" },
  { name: "OpenAI", category: "AI Sandbox", icon: Sparkles, tag: "GPT-4o" },
  { name: "Supabase", category: "Realtime DB", icon: Database, tag: "Postgres" },
  { name: "Monad", category: "Parallel EVM", icon: Zap, tag: "10k TPS" },
  { name: "Docker", category: "Container Engine", icon: Boxes, tag: "Isolated" },
  { name: "Rust", category: "Core Runtime", icon: Terminal, tag: "Memory Safe" },
  { name: "EigenLayer", category: "Restaking", icon: Key, tag: "AVS Consensus" },
];

export default function LogoCarouselSection() {
  return (
    <section className="relative z-10 w-full bg-[#050711] py-20 overflow-hidden isolate border-t border-white/[0.06]">
      {/* Soft atmospheric background lighting matching the hero */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 h-80 w-80 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 h-80 w-80 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[120px]" />
      </div>

      {/* Section Header: Scroll-triggered Blur-to-Sharp & Slide-Up Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-7xl px-6 text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 rounded-full minimal-pill px-3.5 py-1 text-[11px] font-mono tracking-widest text-[#E0B0FF] uppercase mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C084FC] animate-pulse" />
          ECOSYSTEM PROTOCOLS & RUNTIMES
        </div>
        <h2 className="text-xl sm:text-2xl font-light tracking-tight text-white/90">
          Integrated with Leading <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2C7FE] to-[#C084FC]">Web3 &amp; AI Infrastructure</span>
        </h2>
      </motion.div>

      {/* Marquee Wrapper with Scroll-triggered scale entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col gap-5 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        {/* ROW 1: Moves Right to Left */}
        <div className="flex w-max gap-5 animate-marquee">
          {[...row1Partners, ...row1Partners].map((partner, idx) => {
            const Icon = partner.icon;
            return (
              <div
                key={`row1-${partner.name}-${idx}`}
                className="group flex items-center gap-3.5 rounded-2xl minimal-panel px-5 py-3.5 border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-[#C084FC]/40 hover:bg-white/[0.05] hover:shadow-[0_0_25px_rgba(192,132,252,0.2)] cursor-pointer"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/80 transition-all duration-300 group-hover:border-[#C084FC]/40 group-hover:bg-[#C084FC]/10 group-hover:text-[#E0B0FF]">
                  <Icon className="h-4 w-4 stroke-[1.5]" />
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-white/90 group-hover:text-white transition-colors">
                      {partner.name}
                    </span>
                    <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-mono text-white/50 group-hover:text-purple-300 transition-colors">
                      {partner.tag}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/40 font-light">
                    {partner.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ROW 2: Moves Left to Right */}
        <div className="flex w-max gap-5 animate-marquee-reverse">
          {[...row2Partners, ...row2Partners].map((partner, idx) => {
            const Icon = partner.icon;
            return (
              <div
                key={`row2-${partner.name}-${idx}`}
                className="group flex items-center gap-3.5 rounded-2xl minimal-panel px-5 py-3.5 border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-[#C084FC]/40 hover:bg-white/[0.05] hover:shadow-[0_0_25px_rgba(192,132,252,0.2)] cursor-pointer"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/80 transition-all duration-300 group-hover:border-[#C084FC]/40 group-hover:bg-[#C084FC]/10 group-hover:text-[#E0B0FF]">
                  <Icon className="h-4 w-4 stroke-[1.5]" />
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-white/90 group-hover:text-white transition-colors">
                      {partner.name}
                    </span>
                    <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-mono text-white/50 group-hover:text-purple-300 transition-colors">
                      {partner.tag}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/40 font-light">
                    {partner.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
