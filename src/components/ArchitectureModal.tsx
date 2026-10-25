"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Cpu, CheckCircle2, ArrowRight, ShieldCheck, Globe, GitPullRequest, Code2, Terminal } from "lucide-react";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ArchitectureModal({ isOpen, onClose }: ArchitectureModalProps) {
  const [activeStep, setActiveStep] = useState(1);

  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      title: "1. GitHub Webhook Trigger",
      icon: GitPullRequest,
      desc: "Maintainer merges PR #1 on GitHub. An event payload is dispatched to Rialo's decentralized network nodes.",
      code: `// GitHub Pull Request Event
{
  "action": "closed",
  "pull_request": {
    "number": 1,
    "merged": true,
    "merged_by": "core-team",
    "bounty_address": "0x7F2...90AB"
  }
}`,
    },
    {
      step: 2,
      title: "2. Native RISC-V Off-Chain HTTPS Execution",
      icon: Cpu,
      desc: "Rialo's deterministic RISC-V sandbox initiates direct TLS 1.3 HTTPS calls to GitHub API to verify commit tree sha and merge status without relying on 3rd-party centralized oracles.",
      code: `// Rialo RISC-V VM Assembly Execution
let res = rialo_https_fetch(
  "https://api.github.com/repos/org/repo/pulls/1"
);
assert!(res.status == 200);
let proof = rialo_zk_attest(res.body);`,
    },
    {
      step: 3,
      title: "3. Cryptographic State Transition & Instant Payout",
      icon: ShieldCheck,
      desc: "The verified state transition is committed on-chain. Smart contract releases 3,500 USDC bounty directly into the contributor's wallet in sub-second finality.",
      code: `// FlashBounty Escrow Release
function releaseBounty(bytes calldata rialoProof) external {
    require(RialoVerifier.verify(rialoProof), "Invalid proof");
    usdc.transfer(contributor, 3500 * 1e6);
    emit BountySettled(1, contributor, 3500);
}`,
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#050816]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-2xl glass-panel border border-cyan-500/30 bg-[#090e29]/95 p-6 md:p-8 shadow-[0_0_60px_rgba(0,245,212,0.25)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00F5D4]/20 border border-[#00F5D4]/40 text-[#00F5D4] shadow-[0_0_15px_rgba(0,245,212,0.4)]">
                <Play className="h-5 w-5 fill-[#00F5D4]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  Rialo Native Architecture Walkthrough
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Off-Chain HTTPS Execution in RISC-V · Zero Oracles
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Step Selector */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = activeStep === s.step;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  className={`flex items-center gap-2 rounded-xl p-2.5 text-left transition-all ${
                    isActive
                      ? "bg-[#00F5D4]/15 border border-[#00F5D4]/50 shadow-[0_0_15px_rgba(0,245,212,0.2)] text-white"
                      : "bg-white/[0.03] border border-white/5 text-slate-400 hover:bg-white/[0.06]"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#00F5D4]" : "text-slate-400"}`} />
                  <span className="text-xs font-medium truncate">Step {s.step}</span>
                </button>
              );
            })}
          </div>

          {/* Step Detail Content */}
          <div className="mt-6 rounded-xl bg-black/40 border border-white/10 p-5">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-white">
                {steps[activeStep - 1].title}
              </h4>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                Active Protocol
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              {steps[activeStep - 1].desc}
            </p>

            <div className="mt-4 rounded-lg bg-[#050816] p-3.5 border border-white/5">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3 w-3 text-[#00F5D4]" />
                  rialo-riscv-runtime v1.4.0
                </span>
                <span>SHA-256 Verified</span>
              </div>
              <pre className="font-mono text-[11px] text-cyan-300 overflow-x-auto leading-relaxed">
                <code>{steps[activeStep - 1].code}</code>
              </pre>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="mt-6 flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveStep((prev) => (prev % 3) + 1)}
              className="flex items-center gap-1.5 text-xs font-mono text-[#00F5D4] hover:underline"
            >
              <span>Next Architecture Stage</span>
              <ArrowRight className="h-3 w-3" />
            </button>

            <button
              onClick={onClose}
              className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-slate-200 transition-colors"
            >
              Close Demo
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
