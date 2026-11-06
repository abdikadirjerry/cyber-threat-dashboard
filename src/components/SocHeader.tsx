import React from "react";
import { ShieldAlert, Terminal, Activity, Radio } from "lucide-react";

interface SocHeaderProps {
  activeTab: "feed" | "intel";
  setActiveTab: (tab: "feed" | "intel") => void;
  activeIncidentsCount: number;
}

export default function SocHeader({
  activeTab,
  setActiveTab,
  activeIncidentsCount,
}: SocHeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-950/50">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-sm font-bold text-slate-100 tracking-wider">
                CYBER-THREAT // SOC
              </h1>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              SEC-OPS MONITORING NODE v2.4
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab("feed")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors flex items-center space-x-1.5 ${
              activeTab === "feed"
                ? "bg-rose-500/20 border border-rose-500/40 text-rose-300"
                : "bg-slate-800/60 border border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Threat Feed ({activeIncidentsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab("intel")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors flex items-center space-x-1.5 ${
              activeTab === "intel"
                ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
                : "bg-slate-800/60 border border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>IP Threat Intel</span>
          </button>
        </div>
      </div>
    </header>
  );
}
