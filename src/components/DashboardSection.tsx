"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle2,
  Terminal,
  Zap,
  Cpu,
  GitPullRequest,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  User,
  Activity,
  Layers,
  Database,
  RefreshCw,
  Coins,
  TrendingUp,
  FileCode,
  ArrowUpRight,
  BarChart3,
  Flame,
  Clock,
  Check,
  X
} from "lucide-react";
import confetti from "canvas-confetti";

interface BountyItem {
  id: string;
  repo: string;
  prNumber: number;
  title: string;
  payout: string;
  payoutNum: number;
  status: "Verified" | "Active" | "Pending";
  contributor: string;
  contributorAvatar?: string;
  time: string;
}

const initialBounties: BountyItem[] = [
  {
    id: "bounty-1",
    repo: "facebook/react",
    prNumber: 1,
    title: "Fast-Path State Machine Bugfix",
    payout: "250 RIALO",
    payoutNum: 250,
    status: "Active",
    contributor: "satoshi-dev",
    contributorAvatar: "https://github.com/satoshi-dev.png",
    time: "2m ago",
  },
  {
    id: "bounty-2",
    repo: "vercel/next.js",
    prNumber: 10,
    title: "Turbopack Incremental Cache Speedup",
    payout: "500 RIALO",
    payoutNum: 500,
    status: "Active",
    contributor: "next-ninja",
    contributorAvatar: "https://github.com/vercel.png",
    time: "14m ago",
  },
  {
    id: "bounty-3",
    repo: "tailwindlabs/tailwindcss",
    prNumber: 4,
    title: "JIT Engine Memory Allocation Fix",
    payout: "150 RIALO",
    payoutNum: 150,
    status: "Active",
    contributor: "css-wizard",
    contributorAvatar: "https://github.com/tailwindlabs.png",
    time: "1h ago",
  },
  {
    id: "bounty-4",
    repo: "ethereum/solidity",
    prNumber: 108,
    title: "Yul Optimizer Inline Assembly Pass",
    payout: "350 RIALO",
    payoutNum: 350,
    status: "Pending",
    contributor: "vitalik-fan",
    contributorAvatar: "https://github.com/ethereum.png",
    time: "3h ago",
  },
];

export default function DashboardSection() {
  // Navigation tab state: Overview | RISC-V VM | Vault | Analytics
  const [activeNavTab, setActiveNavTab] = useState<"Overview" | "RISC-V VM" | "Vault" | "Analytics">("Overview");
  
  // Bounties state
  const [bounties, setBounties] = useState<BountyItem[]>(initialBounties);
  const [selectedBounty, setSelectedBounty] = useState<BountyItem>(initialBounties[0]);
  const [activeFeedTab, setActiveFeedTab] = useState<"Active Bounties" | "Verified PRs">("Active Bounties");
  
  // Interactive Controls state
  const [claimantName, setClaimantName] = useState("yournahian");
  const [claimantAvatar, setClaimantAvatar] = useState("https://github.com/yournahian.png");
  const [vaultBalance, setVaultBalance] = useState<number>(1500);
  const [totalSettledRIALO, setTotalSettledRIALO] = useState<number>(12500);
  const [activeMode, setActiveMode] = useState<"Live API" | "Simulation" | "Devnet">("Live API");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Live verification status phase: Idle -> TLS Handshake... -> RISC-V Proving... -> Settled · 250 RIALO
  const [liveStatusPhase, setLiveStatusPhase] = useState<string>("Idle");
  const [activeVerificationStep, setActiveVerificationStep] = useState<number>(1);
  const [lastPayoutReceipt, setLastPayoutReceipt] = useState<{
    payout: string;
    claimant: string;
    latency: string;
    repo: string;
    prNumber: number;
  } | null>(null);

  const terminalBoxRef = useRef<HTMLDivElement>(null);

  // Terminal stream logs
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[00ms] Rialo RISC-V Sandbox initialized in memory-safe enclave.",
    "[18ms] Listening to GitHub webhooks on /api/v1/rialo/pr-events.",
    "[34ms] Escrow Vault connected: 1,500 RIALO locked treasury.",
    "[50ms] Ready for real-time claimant verification.",
  ]);

  // Auto-scroll terminal stream directly inside its own container without scrolling ancestor shells
  useEffect(() => {
    if (terminalBoxRef.current) {
      terminalBoxRef.current.scrollTop = terminalBoxRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Handle live PR Verification & Terminal Hookup with real-time streaming
  const runVerification = () => {
    if (isVerifying) return;
    setIsVerifying(true);
    setIsSuccess(false);
    setActiveVerificationStep(1);
    setLiveStatusPhase("TLS Handshake...");

    const claimant = claimantName.trim() || "yournahian";
    const avatarUrl = `https://github.com/${claimant}.png`;
    setClaimantAvatar(avatarUrl);
    const currentBounty = selectedBounty;

    const streamSteps = [
      { delay: 80, text: `[00ms] Webhook dispatched from github.com/${currentBounty.repo}/pull/${currentBounty.prNumber}`, step: 1, phase: "TLS Handshake..." },
      { delay: 350, text: `[28ms] Spawning isolated Rialo RISC-V micro-VM instance (rv64imafdc)...`, step: 1, phase: "TLS Handshake..." },
      { delay: 700, text: `[65ms] Initiating off-chain HTTPS GET https://api.github.com/repos/${currentBounty.repo}/pulls/${currentBounty.prNumber}`, step: 1, phase: "TLS Handshake..." },
      { delay: 1050, text: `[118ms] Native TLS 1.3 handshake verified with GitHub Root CAs`, step: 2, phase: "RISC-V Proving..." },
      { delay: 1350, text: `[154ms] Validated PR state: 'merged: true' by maintainer consensus`, step: 2, phase: "RISC-V Proving..." },
      { delay: 1650, text: `[192ms] Computing Rialo zero-oracle cryptographic state transition proof...`, step: 2, phase: "RISC-V Proving..." },
      { delay: 1950, text: `[225ms] Proof validated by 128 decentralized Rialo consensus nodes`, step: 3, phase: `Settled · ${currentBounty.payout}` },
      { delay: 2200, text: `[235ms] SUCCESS: Released ${currentBounty.payout} directly to @${claimant}`, step: 3, phase: `Settled · ${currentBounty.payout}` },
      { delay: 2400, text: `[240ms] Escrow vault updated. Sub-second finality confirmed.`, step: 3, phase: `Settled · ${currentBounty.payout}` },
    ];

    setTerminalLogs([streamSteps[0].text]);

    streamSteps.slice(1).forEach(({ delay, text, step, phase }, idx) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, text]);
        setActiveVerificationStep(step);
        setLiveStatusPhase(phase);

        // Final step execution
        if (idx === streamSteps.length - 2) {
          // Dynamically deduct the exact bounty payout amount from the Escrow Vault Balance
          setVaultBalance((prev) => Math.max(0, prev - currentBounty.payoutNum));
          setTotalSettledRIALO((prev) => prev + currentBounty.payoutNum);

          // Update bounty status in the active feed
          setBounties((prevList) =>
            prevList.map((item) =>
              item.id === currentBounty.id
                ? { ...item, status: "Verified", contributor: claimant, contributorAvatar: avatarUrl, time: "Just now" }
                : item
            )
          );
          setSelectedBounty((prev) => ({
            ...prev,
            status: "Verified",
            contributor: claimant,
            contributorAvatar: avatarUrl,
            time: "Just now",
          }));

          setIsVerifying(false);
          setIsSuccess(true);
          setLiveStatusPhase(`Settled · ${currentBounty.payout}`);
          setLastPayoutReceipt({
            payout: currentBounty.payout,
            claimant: claimant,
            latency: "235ms",
            repo: currentBounty.repo,
            prNumber: currentBounty.prNumber,
          });

          // Web Audio synth chime
          try {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (AudioContextClass) {
              const ctx = new AudioContextClass();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = "sine";
              osc.frequency.setValueAtTime(587.33, ctx.currentTime);
              osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
              gain.gain.setValueAtTime(0.12, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start();
              osc.stop(ctx.currentTime + 0.35);
            }
          } catch {}

          // Confetti celebration with soft cosmic lilac/fuchsia/pink palette
          try {
            confetti({
              particleCount: 90,
              spread: 75,
              origin: { y: 0.65 },
              colors: ["#C084FC", "#E879F9", "#F472B6", "#DDD6FE", "#FFFFFF"],
            });
          } catch {}
        }
      }, delay);
    });
  };

  // Filtered bounties based on search query
  const filteredBounties = bounties.filter(
    (b) =>
      b.repo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative z-20 w-full bg-[#050711] py-24 sm:py-32 px-4 sm:px-6 md:px-10 lg:px-14 overflow-hidden isolate border-t border-white/[0.08]">
      
      {/* Background Soft Pastel / Pink / Cyan Ambient Glowing Gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/15 blur-[160px]" />
        <div className="absolute top-1/3 right-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-cyan-400/12 blur-[170px]" />
        <div className="absolute bottom-10 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        
        {/* Section Title Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono tracking-widest text-[#E0B0FF] uppercase bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00F5D4] animate-ping" />
            WEB3 INTERACTIVE RUNTIME
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* MASTER GLASSMORPHIC DASHBOARD SHELL                                       */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[36px] sm:rounded-[44px] border border-white/20 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.06] backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.65),inset_0_1px_2px_rgba(255,255,255,0.25)] p-6 sm:p-8 md:p-10"
        >
          
          {/* Subtle Ambient Lens Sheens strictly clipped in their own container */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[36px] sm:rounded-[44px]">
            <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-pink-400/20 blur-[120px]" />
            <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-400/20 blur-[120px]" />
          </div>

          {/* ========================================================================= */}
          {/* TOP NAVIGATION BAR: Fully Wired State Tabs                                */}
          {/* ========================================================================= */}
          <div className="relative z-20 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            
            {/* Nav Tabs Menu (Overview | RISC-V VM | Vault | Analytics) */}
            <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] p-1.5 backdrop-blur-xl">
              {(["Overview", "RISC-V VM", "Vault", "Analytics"] as const).map((tab) => {
                const isActive = activeNavTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveNavTab(tab)}
                    className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-white text-slate-950 font-semibold shadow-md"
                        : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Top Right: Search Pill & User Status Avatar */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-xs text-white/70 backdrop-blur-xl">
                <Search className="h-3.5 w-3.5 text-white/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Repos / PRs..."
                  className="bg-transparent text-xs text-white placeholder-white/40 focus:outline-none w-36 sm:w-48"
                />
              </div>

              {/* Profile Avatar Pill */}
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] pl-2 pr-3 py-1 text-xs text-white/90 backdrop-blur-xl">
                <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#00F5D4] to-[#C084FC] text-[10px] font-bold text-slate-950">
                  <User className="h-3.5 w-3.5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 border border-[#090d24]" />
                </div>
                <span className="font-mono text-[11px] text-white/80">rialo-devnet</span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* TAB 1: OVERVIEW VIEW (Default 3-Column Glassmorphic Layout)                */}
          {/* ========================================================================= */}
          {activeNavTab === "Overview" && (
            <motion.div
              key="tab-overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              
              {/* LEFT PANEL: Controls & Dial Meters */}
              <div className="lg:col-span-3 flex flex-col gap-6 justify-between">
                
                {/* TOP CARD: Escrow Vault Balance (Dynamic live balance) */}
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.35)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono tracking-[0.2em] text-purple-200/50 uppercase">
                        01 · TREASURY
                      </span>
                      <Lock className="h-3.5 w-3.5 text-purple-300/60" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold tracking-wide text-white/90">
                        Escrow Vault Balance
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 font-light">
                      Automated multi-sig treasury
                    </p>
                  </div>

                  {/* Circular Gauge Meter */}
                  <div className="relative my-6 flex items-center justify-center">
                    <svg className="h-36 w-36 -rotate-90 transform">
                      <circle
                        cx="72"
                        cy="72"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="10"
                        className="text-white/10"
                        fill="transparent"
                      />
                      <circle
                        cx="72"
                        cy="72"
                        r="58"
                        stroke="url(#vaultGradient)"
                        strokeWidth="10"
                        strokeDasharray={364}
                        strokeDashoffset={364 * (1 - Math.min(1, vaultBalance / 2500))}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-700 ease-out"
                      />
                      <defs>
                        <linearGradient id="vaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#C084FC" />
                          <stop offset="50%" stopColor="#E879F9" />
                          <stop offset="100%" stopColor="#F472B6" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Center Content */}
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        {vaultBalance.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-mono tracking-widest text-purple-200 uppercase">
                        RIALO
                      </span>
                      <span className="text-[9px] text-white/50">Locked Funds</span>
                    </div>

                    <div className="absolute top-4 right-10 h-2.5 w-2.5 rounded-full bg-purple-200 shadow-[0_0_12px_rgba(192,132,252,0.8)]" />
                  </div>

                  {/* Interactive Selectable Tier Buttons */}
                  <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-white/10">
                    {[500, 1000, 1500, 2500].map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setVaultBalance(tier)}
                        className={`flex-1 rounded-xl py-1.5 text-[11px] font-mono transition-all ${
                          vaultBalance === tier
                            ? "bg-gradient-to-r from-purple-400/20 via-fuchsia-400/20 to-indigo-400/20 border border-purple-300/30 text-purple-100 font-bold shadow-md"
                            : "border border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.08]"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 text-center">
                    <button
                      onClick={() => setActiveNavTab("Vault")}
                      className="text-[10px] text-purple-300/80 hover:text-purple-200 cursor-pointer transition-colors inline-flex items-center gap-1"
                    >
                      Open Full Escrow Vault View <ExternalLink className="h-2.5 w-2.5" />
                    </button>
                  </div>
                </div>

                {/* BOTTOM CARD: Rialo RISC-V Runtime Status */}
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.35)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold tracking-wide text-white/90">
                        Rialo Runtime Status
                      </span>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-300" />
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 font-light">
                      Micro-VM execution engine
                    </p>
                  </div>

                  {/* Latency Dial */}
                  <div className="relative my-5 flex items-center justify-center">
                    <div className="h-28 w-28 rounded-full border border-white/10 bg-gradient-to-tr from-white/[0.02] to-white/[0.06] p-1.5 shadow-inner flex items-center justify-center">
                      <div className="h-full w-full rounded-full border-2 border-dashed border-purple-400/30 flex flex-col items-center justify-center text-center p-2">
                        <Cpu className="h-4 w-4 text-purple-300 mb-0.5 animate-pulse" />
                        <span className="text-lg font-bold text-white tracking-tight">
                          0.42ms
                        </span>
                        <span className="text-[9px] font-mono text-purple-200/80">
                          TLS Latency
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-3 right-6 h-2.5 w-2.5 rounded-full bg-pink-400 shadow-[0_0_10px_#f472b6]" />
                  </div>

                  {/* Mode Toggles */}
                  <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10">
                    {(["Live API", "Simulation", "Devnet"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setActiveMode(mode)}
                        className={`rounded-xl py-1.5 text-[10px] font-medium transition-all ${
                          activeMode === mode
                            ? "bg-gradient-to-r from-purple-400/20 via-fuchsia-400/20 to-indigo-400/20 border border-purple-300/30 text-purple-100 font-semibold shadow-md"
                            : "border border-white/10 bg-white/[0.02] text-white/60 hover:text-white"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>

                  {/* Lock New Bounty Button */}
                  <button
                    onClick={() => setVaultBalance((prev) => prev + 500)}
                    className="mt-3.5 flex items-center justify-center gap-1.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 py-2 text-xs font-medium text-white transition-all active:scale-95"
                  >
                    <Lock className="h-3 w-3 text-purple-300" />
                    <span>Lock New Bounty +</span>
                  </button>
                </div>

              </div>

              {/* ========================================================================= */}
              {/* CENTER MAIN STAGE: Space-Train and Astronaut Graphic Asset Visualizer      */}
              {/* ========================================================================= */}
              <div className={`lg:col-span-5 flex flex-col justify-between items-center text-center rounded-[32px] border bg-white/[0.02] backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden transition-all duration-500 ${
                isVerifying
                  ? "border-purple-400/30 shadow-[0_0_50px_rgba(192,132,252,0.15)]"
                  : "border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
              }`}>
                
                {/* Background Luminous Aura */}
                <div className="pointer-events-none absolute inset-0 bg-radial from-pink-500/10 via-purple-600/5 to-transparent blur-2xl" />

                {/* Top Branding matching "NETFLIX" in reference */}
                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-xs font-mono tracking-[0.3em] text-white/70 uppercase">
                    FLASHBOUNTY
                  </span>
                  <span className="text-xs text-white/30">×</span>
                  <span className="text-xs font-mono tracking-[0.3em] text-purple-300 uppercase">
                    RIALO
                  </span>
                </div>

                {/* VISUAL CENTERPIECE: Space Train and Astronaut Visual Representation */}
                <div className="relative z-10 my-6 flex items-center justify-center w-full">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                    className={`relative h-64 sm:h-72 w-full max-w-[380px] rounded-3xl overflow-hidden border transition-all duration-500 group ${
                      isVerifying
                        ? "border-purple-400/40 ring-1 ring-purple-400/30 shadow-[0_0_35px_rgba(192,132,252,0.25)]"
                        : "border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_40px_rgba(244,114,182,0.15)]"
                    }`}
                  >

                    {/* High-res Space Train and Astronaut Asset - ALWAYS VISIBLE */}
                    <Image
                      src="/space-train.png"
                      alt="Space Train and Astronaut Floating in Clouds"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 400px"
                      className={`object-cover transition-transform duration-700 ${
                        isVerifying ? "scale-105" : "scale-100 group-hover:scale-105"
                      }`}
                    />

                    {/* Soft gradient overlay for subtle contrast without dimming artwork */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060814]/80 via-transparent to-black/10 pointer-events-none" />

                    {/* Floating Active PR & Status Bar at the bottom of the Space Train */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="absolute bottom-3 inset-x-3 rounded-2xl border border-white/15 bg-[#060814]/75 backdrop-blur-2xl p-3 text-left shadow-lg overflow-hidden transition-all"
                    >
                      {/* While verifying: sleek thin lavender/pink shimmer progress line along bottom border */}
                      {isVerifying && (
                        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 shadow-[0_0_10px_rgba(192,132,252,0.8)] animate-pulse" />
                      )}

                      <div className="flex items-center justify-between mb-1.5 gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className={`h-2 w-2 rounded-full shrink-0 ${
                            isVerifying
                              ? "bg-purple-300 animate-ping"
                              : selectedBounty.status === "Verified"
                              ? "bg-purple-300"
                              : "bg-purple-400/60"
                          }`} />
                          <span className="text-[11px] font-mono text-purple-200 font-semibold truncate">
                            {selectedBounty.repo} #{selectedBounty.prNumber}
                          </span>
                        </div>

                        {/* Delicate Translucent Glass Status Pill */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {isVerifying ? (
                            <span className="rounded-full bg-gradient-to-r from-purple-400/20 via-fuchsia-400/20 to-indigo-400/20 px-2.5 py-0.5 text-[9px] font-mono text-purple-100 border border-purple-300/30 shadow-[0_0_15px_rgba(192,132,252,0.3)] animate-pulse flex items-center gap-1.5">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-300 animate-spin" />
                              <span>{liveStatusPhase}</span>
                            </span>
                          ) : selectedBounty.status === "Verified" ? (
                            <span className="rounded-full bg-gradient-to-r from-purple-400/20 via-fuchsia-400/20 to-indigo-400/20 px-2.5 py-0.5 text-[9px] font-mono font-medium text-purple-100 border border-purple-300/30 shadow-[0_0_20px_rgba(192,132,252,0.35)] flex items-center gap-1">
                              <span className="text-purple-300">✦</span>
                              <span>Paid {selectedBounty.payout} to @{selectedBounty.contributor || claimantName || "yournahian"} (235ms)</span>
                            </span>
                          ) : (
                            <span className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[9px] font-mono text-purple-200/70 border border-white/10">
                              {liveStatusPhase === "Idle" ? "Idle" : selectedBounty.status}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-white/70 font-light truncate max-w-[170px]">
                          {selectedBounty.title}
                        </span>
                        <span className="text-xs font-bold font-mono text-purple-200">
                          {selectedBounty.payout}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Bold Display Title matching "360 POD" in reference image */}
                <div className="relative z-10">
                  <h3 className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold tracking-[0.06em] text-white uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] mb-3">
                    RIALO DEVNET SANDBOX
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-lg mx-auto">
                    Zero-Oracle Native HTTPS GitHub PR Verification &amp; Instant Payouts. Open-source developers verify pull requests directly inside deterministic RISC-V micro-VMs.
                  </p>
                </div>

              </div>

              {/* RIGHT PANEL: Bounties & Live Execution Feed */}
              <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
                
                {/* TOP CARD: Active Bounties Feed */}
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.35)] flex flex-col justify-between">
                  
                  {/* Card Micro-label Header */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-purple-200/50 uppercase">
                      02 · PULL REQUESTS
                    </span>
                    <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[9px] font-mono text-purple-300/70 border border-white/5">
                      {filteredBounties.filter((b) => activeFeedTab === "Verified PRs" ? b.status === "Verified" : true).length} Listed
                    </span>
                  </div>

                  {/* Segmented Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <div className="flex items-center gap-4 text-xs font-medium">
                      <button
                        onClick={() => setActiveFeedTab("Active Bounties")}
                        className={`transition-colors ${
                          activeFeedTab === "Active Bounties"
                            ? "text-white font-semibold drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        Active Bounties
                      </button>
                      <span className="text-white/20">|</span>
                      <button
                        onClick={() => setActiveFeedTab("Verified PRs")}
                        className={`transition-colors ${
                          activeFeedTab === "Verified PRs"
                            ? "text-white font-semibold drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        Verified PRs
                      </button>
                    </div>
                  </div>

                  {/* Bounties List with Sleek Dark Custom Scrollbar */}
                  <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto pr-1.5 custom-scrollbar">
                    {filteredBounties
                      .filter((b) => (activeFeedTab === "Verified PRs" ? b.status === "Verified" : true))
                      .map((bounty) => {
                        const isSelected = selectedBounty.id === bounty.id;
                        return (
                          <div
                            key={bounty.id}
                            onClick={() => setSelectedBounty(bounty)}
                            className={`group flex items-center justify-between rounded-2xl p-2.5 transition-all cursor-pointer ${
                              isSelected
                                ? "bg-white/[0.08] border border-purple-400/25 shadow-md"
                                : "hover:bg-white/[0.05] border border-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/20 border border-white/15 shadow-sm overflow-hidden">
                                {bounty.status === "Verified" && (bounty.contributorAvatar || claimantAvatar) ? (
                                  <img
                                    src={bounty.contributorAvatar || claimantAvatar}
                                    alt={bounty.contributor}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = "https://github.com/github.png";
                                    }}
                                  />
                                ) : (
                                  <GitPullRequest className={`h-4 w-4 ${isSelected ? "text-purple-300" : "text-white/60"}`} />
                                )}
                              </div>

                              <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-medium text-white truncate group-hover:text-purple-200 transition-colors">
                                    {bounty.repo}
                                  </span>
                                  {bounty.status === "Verified" && (
                                    <span className="text-[9px] font-mono text-purple-300">✓</span>
                                  )}
                                </div>
                                <span className="text-[10px] text-white/50 truncate">
                                  PR #{bounty.prNumber} · {bounty.title}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-end shrink-0 pl-2">
                              <span className="text-xs font-bold font-mono text-purple-200">
                                {bounty.payout}
                              </span>
                              <span className="text-[9px] text-white/40 font-mono">
                                {bounty.time}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* Pagination Dots */}
                  <div className="flex justify-center items-center gap-1.5 pt-4">
                    <span className="h-1.5 w-5 rounded-full bg-purple-300/80" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                  </div>
                </div>

                {/* BOTTOM CARD: Hacker Terminal & Trigger Player */}
                <div className={`rounded-[28px] border bg-white/[0.03] backdrop-blur-2xl p-5 shadow-[0_15px_35px_rgba(0,0,0,0.35)] flex flex-col justify-between transition-all duration-500 ${
                  isVerifying ? "border-purple-400/30 ring-1 ring-purple-400/20 shadow-[0_0_30px_rgba(192,132,252,0.15)]" : "border-white/10"
                }`}>
                  
                  {/* Card Micro-label Header */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-purple-200/50 uppercase">
                      03 · EXECUTION
                    </span>
                    <span className="text-[10px] font-mono text-purple-300/70">Direct Escrow</span>
                  </div>

                  {/* Input Field & Trigger Button */}
                  <div className="flex flex-col gap-2.5 mb-4">
                    <div className="flex items-center justify-between text-[11px] font-medium text-white/80">
                      <span>Claimant GitHub ID</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Live GitHub Avatar Preview */}
                      <div className="relative h-9 w-9 rounded-xl border border-white/15 overflow-hidden bg-black/60 shrink-0 shadow-inner group">
                        <img
                          src={claimantAvatar}
                          alt={claimantName}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = "https://github.com/github.png";
                          }}
                        />
                        <div className="absolute inset-0 bg-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <input
                        type="text"
                        value={claimantName}
                        onChange={(e) => {
                          setClaimantName(e.target.value);
                          const user = e.target.value.trim();
                          if (user) {
                            setClaimantAvatar(`https://github.com/${user}.png`);
                          }
                        }}
                        placeholder="e.g. yournahian"
                        className="flex-1 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs font-mono text-white placeholder-white/40 focus:border-purple-400/60 focus:outline-none"
                      />

                      <button
                        onClick={runVerification}
                        disabled={isVerifying}
                        className={`group relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all shrink-0 border backdrop-blur-xl ${
                          isVerifying
                            ? "bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-indigo-500/20 border-purple-300/30 text-purple-200 cursor-not-allowed shadow-[0_0_20px_rgba(192,132,252,0.25)] animate-pulse"
                            : isSuccess
                            ? "bg-gradient-to-r from-purple-400/20 via-fuchsia-400/20 to-indigo-400/20 border-purple-300/30 text-purple-100 shadow-[0_0_25px_rgba(192,132,252,0.3)] font-bold"
                            : "bg-gradient-to-r from-purple-400/20 via-fuchsia-400/20 to-indigo-400/20 hover:from-purple-400/30 hover:via-fuchsia-400/30 hover:to-indigo-400/30 border-purple-300/30 text-purple-100 active:scale-95 shadow-[0_0_20px_rgba(192,132,252,0.2)]"
                        }`}
                      >
                        {isVerifying ? (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 animate-spin text-purple-200" />
                            <span>Verifying via RISC-V...</span>
                          </>
                        ) : isSuccess ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-purple-200" />
                            <span>Verified &amp; Settled</span>
                          </>
                        ) : (
                          <>
                            <Zap className="h-3.5 w-3.5 text-purple-200" />
                            <span>Trigger</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Live Millisecond Execution Logs Terminal */}
                  <div className={`rounded-2xl border bg-[#060814]/85 p-3.5 font-mono text-[10px] text-white/80 transition-all duration-500 ${
                    isVerifying
                      ? "border-purple-400/40 shadow-[0_0_20px_rgba(192,132,252,0.15)] ring-1 ring-purple-400/30"
                      : "border-white/10"
                  }`}>
                    <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10 text-white/40">
                      <span className="flex items-center gap-1.5">
                        <Terminal className={`h-3 w-3 ${isVerifying ? "text-purple-300 animate-pulse" : "text-purple-400"}`} />
                        Rialo Terminal Stream
                      </span>
                      <span className={`text-[9px] font-semibold ${isVerifying ? "text-purple-200 animate-pulse" : "text-purple-300"}`}>
                        {isVerifying ? "EXECUTING RV64..." : "235ms SLA"}
                      </span>
                    </div>

                    <div
                      ref={terminalBoxRef}
                      className="space-y-1 max-h-24 overflow-y-auto pr-1.5 custom-scrollbar"
                    >
                      {terminalLogs.map((log, i) => (
                        <div
                          key={i}
                          className={
                            log.includes("SUCCESS")
                              ? "text-purple-200 font-semibold"
                              : log.includes("TLS")
                              ? "text-purple-300"
                              : "text-white/70"
                          }
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>


            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: RISC-V VM VIEW (Micro-VM Metrics, Registers & Smart Bytecode)      */}
          {/* ========================================================================= */}
          {activeNavTab === "RISC-V VM" && (
            <motion.div
              key="tab-riscv"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Column: VM Telemetry */}
              <div className="lg:col-span-4 flex flex-col gap-5">
                <div className="rounded-[28px] border border-white/15 bg-white/[0.04] backdrop-blur-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-white">Execution Metrics</h4>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                      Enclave Active
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-white/50">ISA Target</span>
                      <span className="text-cyan-300 font-bold">RV64IMAFDC</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-white/50">Cycle Count</span>
                      <span className="text-white">1,482,904 cycles</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-white/50">Instruction Throughput</span>
                      <span className="text-[#00F5D4]">4.2 MIPS</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-white/50">Heap Allocation</span>
                      <span className="text-purple-300">12.4 MB / 64 MB</span>
                    </div>
                  </div>
                </div>

                {/* Registers Matrix */}
                <div className="rounded-[28px] border border-white/15 bg-white/[0.04] backdrop-blur-xl p-6">
                  <h4 className="text-sm font-semibold text-white mb-3">Core Registers (RISC-V)</h4>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                    <div className="p-2 rounded-lg bg-black/40 text-slate-300">ra: 0x0040102a</div>
                    <div className="p-2 rounded-lg bg-black/40 text-slate-300">sp: 0x7ffffff0</div>
                    <div className="p-2 rounded-lg bg-black/40 text-slate-300">gp: 0x10008000</div>
                    <div className="p-2 rounded-lg bg-black/40 text-slate-300">tp: 0x00000000</div>
                    <div className="p-2 rounded-lg bg-black/40 text-cyan-300">a0: 0x000000c8</div>
                    <div className="p-2 rounded-lg bg-black/40 text-emerald-400">a1: 0x00000001</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Bytecode & Disassembly */}
              <div className="lg:col-span-8 rounded-[28px] border border-white/15 bg-white/[0.04] backdrop-blur-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <FileCode className="h-4 w-4 text-[#00F5D4]" />
                      <span className="text-xs font-mono font-semibold text-white">
                        rialo_github_verifier.bin (Disassembly)
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300">Zero-Oracle Proof</span>
                  </div>

                  <pre className="font-mono text-xs text-slate-300 bg-black/50 p-4 rounded-2xl border border-white/5 overflow-x-auto leading-relaxed custom-scrollbar">
{`// 1. Establish Off-Chain TLS 1.3 socket to api.github.com
0x00401000:  addi sp, sp, -32
0x00401004:  sd   ra, 24(sp)
0x00401008:  lui  a0, %hi(github_tls_ca)
0x0040100c:  jal  ra, rialo_tls13_handshake

// 2. Fetch pull request metadata & commit tree sha
0x00401010:  lui  a1, %hi(pr_endpoint)
0x00401014:  jal  ra, rialo_https_get
0x00401018:  beqz a0, error_handler

// 3. Verify PR merged state & compile zk-SNARK attestation
0x0040101c:  jal  ra, rialo_zk_attest_state
0x00401020:  ld   ra, 24(sp)
0x00401024:  addi sp, sp, 32
0x00401028:  ret  // Return deterministic proof to Escrow Smart Contract`}
                  </pre>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-white/50 font-mono">
                    Deterministic gas cost: 0.00012 RIALO
                  </span>
                  <button
                    onClick={() => setActiveNavTab("Overview")}
                    className="rounded-full bg-white px-5 py-2 text-xs font-bold text-slate-950 hover:bg-slate-200"
                  >
                    ← Back to Dashboard
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: VAULT VIEW (Escrow Vault Management & Multi-Sig Safe)              */}
          {/* ========================================================================= */}
          {activeNavTab === "Vault" && (
            <motion.div
              key="tab-vault"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Vault Overview */}
              <div className="lg:col-span-7 rounded-[28px] border border-white/15 bg-white/[0.04] backdrop-blur-xl p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <Lock className="h-5 w-5 text-[#00F5D4]" />
                      <h4 className="text-base font-bold text-white">Escrow Vault Smart Contract</h4>
                    </div>
                    <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-mono text-[#00F5D4]">
                      0x7F2B...90AB (Verified)
                    </span>
                  </div>

                  <p className="text-xs text-white/60 mb-6 leading-relaxed">
                    Smart contract escrow pools hold project funds in non-custodial multi-sig vaults. Payouts are executed autonomously when Rialo consensus nodes submit cryptographic PR merge proofs.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                      <span className="text-[10px] font-mono text-white/50">Current Locked Pool</span>
                      <div className="text-xl font-bold font-mono text-white mt-1">
                        {vaultBalance.toLocaleString()} RIALO
                      </div>
                      <span className="text-[10px] text-emerald-400">100% Solvency</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                      <span className="text-[10px] font-mono text-white/50">Total Settled RIALO</span>
                      <div className="text-xl font-bold font-mono text-[#00F5D4] mt-1">
                        {totalSettledRIALO.toLocaleString()} RIALO
                      </div>
                      <span className="text-[10px] text-white/50">Instant Transfers</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 col-span-2 sm:col-span-1">
                      <span className="text-[10px] font-mono text-white/50">Release Speed</span>
                      <div className="text-xl font-bold font-mono text-purple-300 mt-1">
                        &lt; 240ms
                      </div>
                      <span className="text-[10px] text-white/50">Sub-second block</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setVaultBalance((prev) => prev + 500)}
                      className="rounded-xl bg-[#00F5D4] px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-300"
                    >
                      Deposit 500 RIALO
                    </button>
                    <button
                      onClick={() => setVaultBalance((prev) => Math.max(500, prev - 500))}
                      className="rounded-xl border border-white/20 px-4 py-2 text-xs font-medium text-white hover:bg-white/10"
                    >
                      Simulate Payout
                    </button>
                  </div>
                  <button
                    onClick={() => setActiveNavTab("Overview")}
                    className="text-xs font-mono text-purple-300 hover:text-white"
                  >
                    ← Back to Dashboard
                  </button>
                </div>
              </div>

              {/* Security & Multi-Sig Signers */}
              <div className="lg:col-span-5 rounded-[28px] border border-white/15 bg-white/[0.04] backdrop-blur-xl p-7 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Multi-Sig Consensus Signers</h4>
                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-slate-300">Rialo Validator Cluster A</span>
                      <span className="text-emerald-400 font-bold">Signed (3/3)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-slate-300">GitHub TLS Proof Node</span>
                      <span className="text-emerald-400 font-bold">Attested</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-slate-300">Timelock Grace Period</span>
                      <span className="text-cyan-300">0s (Fast Path)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-200">
                  <ShieldCheck className="h-4 w-4 inline mr-1 text-[#00F5D4]" />
                  Zero Third-Party Oracle Risk. Cryptographically secured by native RISC-V off-chain TLS verification.
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: ANALYTICS VIEW (Latency, Settled Volume, Gas Savings)               */}
          {/* ========================================================================= */}
          {activeNavTab === "Analytics" && (
            <motion.div
              key="tab-analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Column: Latency Benchmarks */}
              <div className="lg:col-span-7 rounded-[28px] border border-white/15 bg-white/[0.04] backdrop-blur-xl p-7">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#00F5D4]" />
                    <h4 className="text-base font-bold text-white">Execution Latency Benchmarks</h4>
                  </div>
                  <span className="text-xs font-mono text-purple-300">Real-Time</span>
                </div>

                {/* Visual Bar Chart */}
                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-slate-300">Rialo RISC-V TLS 1.3 Handshake</span>
                      <span className="text-[#00F5D4] font-bold">0.42ms</span>
                    </div>
                    <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-gradient-to-r from-[#00F5D4] to-cyan-400 w-[15%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-slate-300">Zero-Oracle State Transition Proof</span>
                      <span className="text-purple-300 font-bold">120ms</span>
                    </div>
                    <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-gradient-to-r from-purple-400 to-[#C084FC] w-[35%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-slate-300">On-Chain Smart Contract Finality</span>
                      <span className="text-pink-400 font-bold">235ms</span>
                    </div>
                    <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-gradient-to-r from-pink-400 to-rose-400 w-[55%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-slate-400">Legacy 3rd-Party Oracle Delay</span>
                      <span className="text-red-400 font-bold">3,600,000ms (~1 hr)</span>
                    </div>
                    <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-red-500/40 w-[100%]" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white/50">
                  <span>99.4% Gas Savings vs Centralized Oracles</span>
                  <button
                    onClick={() => setActiveNavTab("Overview")}
                    className="text-white hover:underline font-mono"
                  >
                    ← Back to Dashboard
                  </button>
                </div>
              </div>

              {/* Right Column: Historical Payout Summary */}
              <div className="lg:col-span-5 rounded-[28px] border border-white/15 bg-white/[0.04] backdrop-blur-xl p-7 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-4">Payout Volume & Success</h4>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex justify-between">
                      <span className="text-white/50">Total Bounties Claimed</span>
                      <span className="text-white font-bold">142 PRs</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex justify-between">
                      <span className="text-white/50">Cumulative Payouts</span>
                      <span className="text-[#00F5D4] font-bold">{totalSettledRIALO.toLocaleString()} RIALO</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex justify-between">
                      <span className="text-white/50">Consensus Uptime</span>
                      <span className="text-emerald-400 font-bold">99.99%</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveNavTab("Overview")}
                  className="mt-6 w-full rounded-2xl bg-white py-2.5 text-xs font-bold text-slate-950 hover:bg-slate-200"
                >
                  Return to Main Stage
                </button>
              </div>
            </motion.div>
          )}

        </motion.div>

      </div>
    </section>
  );
}
