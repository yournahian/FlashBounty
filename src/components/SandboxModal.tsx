"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, Terminal, CheckCircle2, GitMerge, ArrowRight, ShieldCheck, RefreshCw, Sparkles, DollarSign } from "lucide-react";

interface SandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SandboxModal({ isOpen, onClose }: SandboxModalProps) {
  const [status, setStatus] = useState<"idle" | "fetching" | "verifying" | "settled">("idle");
  const [logs, setLogs] = useState<string[]>([
    "[0.00s] Rialo RISC-V Devnet initialized.",
    "[0.01s] Ready for off-chain GitHub webhook simulation.",
  ]);

  if (!isOpen) return null;

  const runSimulation = () => {
    setStatus("fetching");
    setLogs([
      "[0.00s] Webhook received: PR #1 merged by maintainer '0xCore'",
      "[0.34s] Spawning Rialo RISC-V isolated execution environment...",
      "[0.58s] Dispatched off-chain HTTPS GET https://api.github.com/repos/flashbounty/core/pulls/1",
    ]);

    setTimeout(() => {
      setStatus("verifying");
      setLogs((prev) => [
        ...prev,
        "[1.12s] HTTPS TLS 1.3 Handshake succeeded with native root CAs",
        "[1.45s] Response payload validated: status = 'merged', commit_hash = 0x8a91b...c4",
        "[1.78s] Generating Rialo cryptographic state transition proof...",
      ]);

      setTimeout(() => {
        setStatus("settled");
        setLogs((prev) => [
          ...prev,
          "[2.10s] Proof verified on FlashBounty Escrow contract",
          "[2.25s] SUCCESS: Released 3,500 USDC to contributor 0x7F2...90AB",
          "[2.30s] Zero 3rd-party oracles involved. Sub-second finality confirmed.",
        ]);

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#00F5D4", "#7B2CBF", "#ffffff"],
          });
        } catch {
          // ignore
        }
      }, 1000);
    }, 1000);
  };

  const resetSimulation = () => {
    setStatus("idle");
    setLogs([
      "[0.00s] Rialo RISC-V Devnet reset.",
      "[0.01s] Ready for off-chain GitHub webhook simulation.",
    ]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#050816]/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl glass-panel border border-cyan-400/40 bg-[#070b22]/95 p-6 shadow-[0_0_60px_rgba(0,245,212,0.3)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-[#00F5D4] border border-cyan-400/30">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  Explore Devnet Sandbox
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Live Rialo RISC-V Off-Chain HTTPS Pipeline
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

          {/* Interactive PR Simulation Bar */}
          <div className="mt-5 rounded-xl bg-black/50 border border-white/10 p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-[#00F5D4]">
                    PR #1: Fast-Path State Machine
                  </span>
                  <span className="rounded bg-purple-500/20 px-2 py-0.5 text-[10px] font-mono text-purple-300">
                    Bounty: 3,500 USDC
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Target repo: <span className="font-mono text-slate-300">flashbounty/core</span>
                </p>
              </div>

              {status === "idle" && (
                <button
                  onClick={runSimulation}
                  className="flex items-center gap-2 rounded-full bg-[#00F5D4] px-4 py-2 text-xs font-bold text-slate-950 transition-all hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,245,212,0.5)]"
                >
                  <GitMerge className="h-3.5 w-3.5" />
                  <span>Simulate PR Merge</span>
                </button>
              )}

              {(status === "fetching" || status === "verifying") && (
                <div className="flex items-center gap-2 rounded-full bg-cyan-500/20 px-4 py-2 text-xs font-mono text-[#00F5D4] border border-cyan-500/40 animate-pulse">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>{status === "fetching" ? "Executing HTTPS Call..." : "Verifying Proof..."}</span>
                </div>
              )}

              {status === "settled" && (
                <button
                  onClick={resetSimulation}
                  className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-mono text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Settled! Run Again</span>
                </button>
              )}
            </div>
          </div>

          {/* Terminal Console Logs */}
          <div className="mt-4 rounded-xl bg-[#040614] border border-white/10 p-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/5 text-[10px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                Rialo Sandbox Console Output
              </span>
              <span>Memory: 16 MB</span>
            </div>
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={
                    log.includes("SUCCESS")
                      ? "text-[#00F5D4] font-semibold"
                      : log.includes("Dispatched")
                      ? "text-cyan-300"
                      : "text-slate-300"
                  }
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-5 flex items-center justify-between text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#00F5D4]" />
              Zero Third-Party Oracle Risk
            </span>
            <button
              onClick={onClose}
              className="rounded-full bg-white/10 px-4 py-1.5 text-xs text-slate-200 hover:bg-white/20 transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
