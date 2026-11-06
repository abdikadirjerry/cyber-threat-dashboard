import React from "react";
import type { SecurityMetric } from "../data/mockSecurityData";
import { Shield, Clock, Activity, Lock } from "lucide-react";

interface MetricCardsProps {
  metrics: SecurityMetric[];
}

export default function MetricCards({ metrics }: MetricCardsProps) {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Shield className="w-4 h-4 text-rose-400" />;
      case 1:
        return <Clock className="w-4 h-4 text-emerald-400" />;
      case 2:
        return <Activity className="w-4 h-4 text-cyan-400" />;
      case 3:
        return <Lock className="w-4 h-4 text-amber-400" />;
      default:
        return <Shield className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-mono">
              {metric.title}
            </span>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              {getIcon(idx)}
            </div>
          </div>
          <div>
            <div
              className={`text-xl font-bold font-mono tracking-tight ${metric.color}`}
            >
              {metric.value}
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              {metric.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
