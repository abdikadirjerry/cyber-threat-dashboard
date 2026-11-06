import React, { useState } from "react";
import { METRICS_DATA, INITIAL_ALERTS } from "./data/mockSecurityData";
import type { ThreatAlert, IncidentStatus } from "./types/dashboard";
import SocHeader from "./components/SocHeader";
import MetricCards from "./components/MetricCards";
import ThreatFeed from "./components/ThreatFeed";
import IpIntelligenceView from "./components/IpIntelligenceView";
import AlertDetailModal from "./components/AlertDetailModal";

export default function App() {
  const [activeTab, setActiveTab] = useState<"feed" | "intel">("feed");
  const [alerts, setAlerts] = useState<ThreatAlert[]>(INITIAL_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState<ThreatAlert | null>(null);

  const handleUpdateStatus = (id: string, newStatus: IncidentStatus) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, status: newStatus } : alert,
      ),
    );
  };

  const activeIncidentsCount = alerts.filter(
    (a) => a.status === "Active",
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-mono selection:bg-rose-500 selection:text-white">
      <SocHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeIncidentsCount={activeIncidentsCount}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <MetricCards metrics={METRICS_DATA} />

        {activeTab === "feed" ? (
          <ThreatFeed
            alerts={alerts}
            onUpdateStatus={handleUpdateStatus}
            onSelectAlert={setSelectedAlert}
          />
        ) : (
          <IpIntelligenceView />
        )}
      </main>

      <AlertDetailModal
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      <footer className="border-t border-slate-800/80 py-4 text-center text-[11px] text-slate-500 font-mono">
        CYBER-THREAT // SOC ANALYTICS ENGINE &copy; 2026 — STACK: REACT +
        TYPESCRIPT + TAILWIND V4
      </footer>
    </div>
  );
}
