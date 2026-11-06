import React, { useState } from "react";
import { IpIntelligence } from "../types/dashboard";
import { MOCK_IP_INTEL } from "../data/mockSecurityData";
import {
  Terminal,
  ShieldAlert,
  Globe,
  Server,
  AlertOctagon,
} from "lucide-react";

export default function IpIntelligenceView() {
  const [searchIp, setSearchIp] = useState("");
  const [intelResult, setIntelResult] = useState<IpIntelligence | null>(
    MOCK_IP_INTEL["192.168.1.105"] || null,
  );
  const [notFound, setNotFound] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchIp.trim()) return;

    if (MOCK_IP_INTEL[searchIp]) {
      setIntelResult(MOCK_IP_INTEL[searchIp]);
      setNotFound(false);
    } else {
      setIntelResult(null);
      setNotFound(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
        <h2 className="text-sm font-bold text-slate-100 font-mono mb-2 flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>IP Threat Intelligence & Reputation Lookup</span>
        </h2>
        <p className="text-xs text-slate-400 font-mono mb-6">
          Query global abuse databases, ASN registries, and threat telemetry
          hashes for suspicious source IPs.
        </p>

        <form onSubmit={handleLookup} className="flex gap-3">
          <input
            type="text"
            placeholder="Enter IP address (e.g. 192.168.1.105, 45.33.32.156)"
            value={searchIp}
            onChange={(e) => setSearchIp(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs font-mono transition-colors"
          >
            Query Intel
          </button>
        </form>
      </div>

      {notFound && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 text-center">
          <AlertOctagon className="w-8 h-8 text-rose-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-rose-300 font-mono">
            IP Address Not Found in Threat Registry
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">
            No active telemetry or historical abuse logs recorded for {searchIp}
            .
          </p>
        </div>
      )}

      {intelResult && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Target IP
              </span>
              <h3 className="text-lg font-bold text-cyan-400 font-mono mt-0.5">
                {intelResult.ip}
              </h3>
            </div>
            <span
              className={`px-3 py-1 rounded-xl border text-xs font-mono font-bold ${
                intelResult.status === "Flagged"
                  ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/30"
              }`}
            >
              Status: {intelResult.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <span className="text-[11px] text-slate-500 font-mono flex items-center space-x-1.5 mb-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Reputation Score</span>
              </span>
              <span
                className={`text-xl font-bold font-mono ${
                  intelResult.reputationScore > 80
                    ? "text-rose-400"
                    : "text-amber-400"
                }`}
              >
                {intelResult.reputationScore} / 100
              </span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <span className="text-[11px] text-slate-500 font-mono flex items-center space-x-1.5 mb-1">
                <Server className="w-3.5 h-3.5 text-cyan-400" />
                <span>ISP / ASN</span>
              </span>
              <span className="text-xs font-mono text-slate-200">
                {intelResult.isp}
              </span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <span className="text-[11px] text-slate-500 font-mono flex items-center space-x-1.5 mb-1">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Origin Country</span>
              </span>
              <span className="text-xs font-mono text-slate-200">
                {intelResult.country}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
