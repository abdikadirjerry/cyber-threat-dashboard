import React, { useState } from "react";
import type {
  ThreatAlert,
  SeverityLevel,
  IncidentStatus,
} from "../types/dashboard";
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

interface ThreatFeedProps {
  alerts: ThreatAlert[];
  onUpdateStatus: (id: string, newStatus: IncidentStatus) => void;
  onSelectAlert: (alert: ThreatAlert) => void;
}

export default function ThreatFeed({
  alerts,
  onUpdateStatus,
  onSelectAlert,
}: ThreatFeedProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const severities = ["All", "Critical", "High", "Medium", "Low"];
  const statuses = ["All", "Active", "Acknowledged", "Resolved"];

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.sourceIp.includes(searchTerm) ||
      alert.threatType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.signature.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      selectedSeverity === "All" || alert.severity === selectedSeverity;
    const matchesStatus =
      selectedStatus === "All" || alert.status === selectedStatus;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case "Critical":
        return "bg-rose-500/10 border-rose-500/30 text-rose-400";
      case "High":
        return "bg-amber-500/10 border-amber-500/30 text-amber-400";
      case "Medium":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-400";
      case "Low":
        return "bg-cyan-500/10 border-cyan-500/30 text-cyan-400";
    }
  };

  const getStatusBadge = (status: IncidentStatus) => {
    switch (status) {
      case "Active":
        return "text-rose-400 bg-rose-500/10 border-rose-500/30";
      case "Acknowledged":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      case "Resolved":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls & Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by ID, IP, threat type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Severity Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-[11px] text-slate-400 font-mono">
              Severity:
            </span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-rose-500"
            >
              {severities.map((sev) => (
                <option key={sev} value={sev}>
                  {sev}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-[11px] text-slate-400 font-mono">
              Status:
            </span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-rose-500"
            >
              {statuses.map((stat) => (
                <option key={stat} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Threat Alerts Table */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-mono text-slate-400">
                <th className="py-3 px-4">Alert ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Threat Vector</th>
                <th className="py-3 px-4">Source IP</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                    onClick={() => onSelectAlert(alert)}
                  >
                    <td className="py-3 px-4 font-bold text-slate-200">
                      {alert.id}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {alert.timestamp}
                    </td>
                    <td className="py-3 px-4 text-slate-200 font-sans font-medium">
                      {alert.threatType}
                    </td>
                    <td className="py-3 px-4 text-cyan-400">
                      {alert.sourceIp}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold ${getSeverityBadge(alert.severity)}`}
                      >
                        {alert.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg border text-[10px] font-semibold ${getStatusBadge(alert.status)}`}
                      >
                        {alert.status}
                      </span>
                    </td>
                    <td
                      className="py-3 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end space-x-2">
                        {alert.status !== "Acknowledged" &&
                          alert.status !== "Resolved" && (
                            <button
                              onClick={() =>
                                onUpdateStatus(alert.id, "Acknowledged")
                              }
                              className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-[10px] transition-colors"
                            >
                              Acknowledge
                            </button>
                          )}
                        {alert.status !== "Resolved" && (
                          <button
                            onClick={() => onUpdateStatus(alert.id, "Resolved")}
                            className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] transition-colors"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-slate-500 font-mono"
                  >
                    No threat alerts matching current filter parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
