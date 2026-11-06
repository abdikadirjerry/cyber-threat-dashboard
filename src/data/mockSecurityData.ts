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

export const METRICS_DATA: SecurityMetric[] = [
  {
    title: "Active Threat Incidents",
    value: 14,
    change: "+3 in last hr",
    trend: "up",
    color: "text-rose-400",
  },
  {
    title: "Mean Time to Detect (MTTD)",
    value: "1.4m",
    change: "-18% vs yesterday",
    trend: "down",
    color: "text-emerald-400",
  },
  {
    title: "Events Audited (24h)",
    value: "1,420,890",
    change: "+12% network throughput",
    trend: "up",
    color: "text-cyan-400",
  },
  {
    title: "Blocked Brute Force IPs",
    value: 84,
    change: "Automated firewall active",
    trend: "neutral",
    color: "text-amber-400",
  },
];

export const INITIAL_ALERTS: ThreatAlert[] = [
  {
    id: "ALT-9041",
    timestamp: "14:02:11",
    sourceIp: "192.168.1.105",
    destinationIp: "10.0.0.12",
    threatType: "SSH Brute Force",
    severity: "Critical",
    status: "Active",
    location: "Hargeisa, SO",
    description:
      "Multiple failed authentication attempts detected over port 22 within 30 seconds.",
    signature: "SIG-SSH-BF-001",
  },
  {
    id: "ALT-9042",
    timestamp: "13:58:45",
    sourceIp: "45.33.32.156",
    destinationIp: "10.0.0.45",
    threatType: "SQL Injection Attempt",
    severity: "High",
    status: "Active",
    location: "Frankfurt, DE",
    description:
      "Malformed HTTP POST payload targeting login endpoint with UNION SELECT injection pattern.",
    signature: "SIG-SQLI-PAT-004",
  },
  {
    id: "ALT-9043",
    timestamp: "13:42:00",
    sourceIp: "185.220.101.5",
    destinationIp: "10.0.0.88",
    threatType: "Port Scan Activity",
    severity: "Medium",
    status: "Acknowledged",
    location: "Amsterdam, NL",
    description: "Sequential SYN stealth scan detected across range 1-1024.",
    signature: "SIG-NET-SCAN-012",
  },
  {
    id: "ALT-9044",
    timestamp: "13:15:30",
    sourceIp: "10.0.4.12",
    destinationIp: "10.0.0.2",
    threatType: "Unauthorized Priv Esc",
    severity: "Critical",
    status: "Active",
    location: "Internal Workstation",
    description: "Sudo elevation anomaly flagged by system log parser daemon.",
    signature: "SIG-SEC-LOG-889",
  },
  {
    id: "ALT-9045",
    timestamp: "12:50:18",
    sourceIp: "104.244.72.115",
    destinationIp: "10.0.0.5",
    threatType: "DNS Tunneling Suspect",
    severity: "Low",
    status: "Resolved",
    location: "London, UK",
    description:
      "Abnormal TXT record querying volume detected on external recursive resolver.",
    signature: "SIG-DNS-TUN-002",
  },
];

export const MOCK_IP_INTEL: Record<string, IpIntelligence> = {
  "192.168.1.105": {
    ip: "192.168.1.105",
    reputationScore: 92,
    isp: "Local Subnet Gateway",
    country: "Somalia (Hargeisa Node)",
    associatedAlertsCount: 6,
    status: "Flagged",
  },
  "45.33.32.156": {
    ip: "45.33.32.156",
    reputationScore: 88,
    isp: "Linode LLC Host",
    country: "Germany",
    associatedAlertsCount: 4,
    status: "Flagged",
  },
  "185.220.101.5": {
    ip: "185.220.101.5",
    reputationScore: 65,
    isp: "Tor Exit Node",
    country: "Netherlands",
    associatedAlertsCount: 2,
    status: "Investigating",
  },
};
