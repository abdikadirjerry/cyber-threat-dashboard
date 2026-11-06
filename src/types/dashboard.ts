export type SeverityLevel = "Critical" | "High" | "Medium" | "Low";
export type IncidentStatus = "Active" | "Acknowledged" | "Resolved";

export interface ThreatAlert {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  threatType: string;
  severity: SeverityLevel;
  status: IncidentStatus;
  location: string;
  description: string;
  signature: string;
}

export interface SecurityMetric {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "neutral";
  color: string;
}

export interface IpIntelligence {
  ip: string;
  reputationScore: number;
  isp: string;
  country: string;
  associatedAlertsCount: number;
  status: "Flagged" | "Clean" | "Investigating";
}
