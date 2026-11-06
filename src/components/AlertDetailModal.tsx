import React from "react";
import { ThreatAlert } from "../types/dashboard";
import {
  X,
  ShieldAlert,
  Terminal,
  Clock,
  Globe,
  Cpu,
  CheckCircle,
} from "lucide-react";

interface AlertDetailModalProps {
  alert: ThreatAlert | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: "Acknowledged" | "Resolved") => void;
}

export default function AlertDetailModal({
  alert,
  onClose,
  onUpdateStatus,
}: AlertDetailModalProps) {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative font-mono text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-rose-400">
                {alert.id}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-xs text-slate-400">{alert.signature}</span>
            </div>
            <h2 className="text-base font-bold text-slate-100 mt-0.5">
              {alert.threatType}
            </h2>
          </div>
        </div>

        {/* Detail Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-xs">
          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
            <span className="text-[10px] text-slate-500 block mb-1 flex items-center space-x-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Timestamp</span>
            </span>
            <span className="text-slate-200 font-bold">{alert.timestamp}</span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
            <span className="text-[10px] text-slate-500 block mb-1 flex items-center space-x-1">
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>Source IP</span>
            </span>
            <span className="text-cyan-400 font-bold">{alert.sourceIp}</span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
            <span className="text-[10px] text-slate-500 block mb-1 flex items-center space-x-1">
              <Cpu className="w-3 h-3 text-emerald-400" />
              <span>Target IP</span>
            </span>
            <span className="text-slate-200 font-bold">
              {alert.destinationIp}
            </span>
          </div>
        </div>

        {/* Payload / Description */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl mb-6">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2 flex items-center space-x-1">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Telemetry Forensic Log Payload</span>
          </span>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {alert.description}
          </p>
        </div>

        {/* Modal Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            Current Status:{" "}
            <span className="text-slate-200 font-bold">{alert.status}</span>
          </div>
          <div className="flex space-x-2">
            {alert.status !== "Acknowledged" && alert.status !== "Resolved" && (
              <button
                onClick={() => {
                  onUpdateStatus(alert.id, "Acknowledged");
                  onClose();
                }}
                className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 rounded-xl text-xs font-bold transition-colors"
              >
                Acknowledge Incident
              </button>
            )}
            {alert.status !== "Resolved" && (
              <button
                onClick={() => {
                  onUpdateStatus(alert.id, "Resolved");
                  onClose();
                }}
                className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Mark Resolved</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
