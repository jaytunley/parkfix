// Mock data for ParkFix prototype
export type Role = "park" | "supplier" | "freelancer";

export type TicketStatus =
  | "open"
  | "quoted"
  | "in_progress"
  | "awaiting_parts"
  | "resolved";

export type Priority = "low" | "medium" | "high" | "critical";

export interface Asset {
  id: string;
  name: string;
  category: string;
  location: string;
  image: string;
  uptime: number;
  status: "operational" | "down" | "maintenance";
  installedYear: number;
  manufacturer: string;
}

export interface Quote {
  id: string;
  vendor: string;
  vendorType: "supplier" | "freelancer";
  rating: number;
  price: number;
  eta: string;
  warranty: string;
  notes: string;
}

export interface Ticket {
  id: string;
  title: string;
  assetId: string;
  assetName: string;
  status: TicketStatus;
  priority: Priority;
  createdAt: string;
  reporter: string;
  description: string;
  isPublic: boolean;
  quotes: Quote[];
  messages: { from: string; text: string; time: string }[];
}

export const assets: Asset[] = [
  {
    id: "a1",
    name: "Thunderbolt Coaster",
    category: "Roller Coaster",
    location: "Zone A · East",
    image: "🎢",
    uptime: 96.4,
    status: "down",
    installedYear: 2019,
    manufacturer: "VekomaWorks",
  },
  {
    id: "a2",
    name: "Splash Galleon",
    category: "Water Ride",
    location: "Zone B · Lagoon",
    image: "🚣",
    uptime: 99.1,
    status: "operational",
    installedYear: 2021,
    manufacturer: "AquaRide Co.",
  },
  {
    id: "a3",
    name: "Sky Carousel",
    category: "Carousel",
    location: "Zone C · Central",
    image: "🎠",
    uptime: 99.8,
    status: "operational",
    installedYear: 2017,
    manufacturer: "Bertazzon",
  },
  {
    id: "a4",
    name: "Ferris Horizon",
    category: "Ferris Wheel",
    location: "Zone D · North",
    image: "🎡",
    uptime: 97.2,
    status: "maintenance",
    installedYear: 2015,
    manufacturer: "Intamin",
  },
  {
    id: "a5",
    name: "Drop Tower X",
    category: "Drop Tower",
    location: "Zone A · West",
    image: "🗼",
    uptime: 94.8,
    status: "operational",
    installedYear: 2018,
    manufacturer: "S&S Sansei",
  },
  {
    id: "a6",
    name: "Mini Karts",
    category: "Go-Kart",
    location: "Zone E · Track",
    image: "🏎️",
    uptime: 98.5,
    status: "operational",
    installedYear: 2022,
    manufacturer: "Sodikart",
  },
];

export const tickets: Ticket[] = [
  {
    id: "t1001",
    title: "Hydraulic brake leak on Car 3",
    assetId: "a1",
    assetName: "Thunderbolt Coaster",
    status: "quoted",
    priority: "critical",
    createdAt: "2h ago",
    reporter: "Marco · Operations",
    description:
      "Operators noticed a slow drip from the hydraulic line near the brake assembly on car 3. Ride is closed pending inspection.",
    isPublic: true,
    quotes: [
      {
        id: "q1",
        vendor: "VekomaWorks Service",
        vendorType: "supplier",
        rating: 4.9,
        price: 4800,
        eta: "Tomorrow, 9:00",
        warranty: "12 months",
        notes: "OEM seal kit + certified technician on-site.",
      },
      {
        id: "q2",
        vendor: "Luca Bianchi",
        vendorType: "freelancer",
        rating: 4.8,
        price: 3200,
        eta: "Today, 18:00",
        warranty: "6 months",
        notes: "Same-day response, 12 years coaster hydraulics experience.",
      },
      {
        id: "q3",
        vendor: "RideFix Solutions",
        vendorType: "supplier",
        rating: 4.6,
        price: 3950,
        eta: "Tomorrow, 14:00",
        warranty: "9 months",
        notes: "Full diagnostic + replacement seals.",
      },
    ],
    messages: [
      { from: "Marco", text: "Closed the ride at 11:40. Photos attached.", time: "11:42" },
      { from: "VekomaWorks", text: "We can dispatch a tech tomorrow morning.", time: "12:08" },
      { from: "Luca Bianchi", text: "Available today, sending a quote now.", time: "12:14" },
    ],
  },
  {
    id: "t1002",
    title: "Control panel display flickering",
    assetId: "a4",
    assetName: "Ferris Horizon",
    status: "in_progress",
    priority: "medium",
    createdAt: "1d ago",
    reporter: "Anna · Maintenance",
    description: "Operator panel screen flickers intermittently during boarding cycles.",
    isPublic: false,
    quotes: [],
    messages: [
      { from: "Anna", text: "Tech arrived 09:00, diagnosing now.", time: "09:14" },
    ],
  },
  {
    id: "t1003",
    title: "Unusual noise from drive motor",
    assetId: "a5",
    assetName: "Drop Tower X",
    status: "open",
    priority: "high",
    createdAt: "5h ago",
    reporter: "Diego · Operations",
    description: "Grinding noise from main drive during ascent. Voice note attached.",
    isPublic: true,
    quotes: [],
    messages: [],
  },
  {
    id: "t1004",
    title: "Seat belt latch replacement",
    assetId: "a2",
    assetName: "Splash Galleon",
    status: "resolved",
    priority: "low",
    createdAt: "3d ago",
    reporter: "Sara · Safety",
    description: "Belt latch #7 worn, replaced under preventive maintenance.",
    isPublic: false,
    quotes: [],
    messages: [],
  },
  {
    id: "t1005",
    title: "Lighting outage on platform",
    assetId: "a3",
    assetName: "Sky Carousel",
    status: "awaiting_parts",
    priority: "medium",
    createdAt: "2d ago",
    reporter: "Marco · Operations",
    description: "Half of platform LEDs are out. Replacement strips ordered.",
    isPublic: false,
    quotes: [],
    messages: [],
  },
];

export const statusMeta: Record<TicketStatus, { label: string; tone: string }> = {
  open: { label: "Open", tone: "bg-warning/15 text-warning-foreground border-warning/30" },
  quoted: { label: "Quoted", tone: "bg-teal/15 text-teal border-teal/30" },
  in_progress: { label: "In progress", tone: "bg-primary/10 text-primary border-primary/30" },
  awaiting_parts: { label: "Awaiting parts", tone: "bg-muted text-muted-foreground border-border" },
  resolved: { label: "Resolved", tone: "bg-success/15 text-success border-success/30" },
};

export const priorityMeta: Record<Priority, { label: string; tone: string }> = {
  low: { label: "Low", tone: "text-muted-foreground" },
  medium: { label: "Medium", tone: "text-teal" },
  high: { label: "High", tone: "text-warning" },
  critical: { label: "Critical", tone: "text-destructive" },
};

export const supplierJobs = [
  { id: "j1", park: "Adventureland Milano", asset: "Thunderbolt Coaster", status: "Awaiting approval", value: 4800, due: "Tomorrow" },
  { id: "j2", park: "OceanPark Genova", asset: "Splash Galleon", status: "In progress", value: 2100, due: "Today" },
  { id: "j3", park: "FunWorld Roma", asset: "Sky Carousel", status: "Scheduled", value: 950, due: "Fri" },
  { id: "j4", park: "Adventureland Milano", asset: "Ferris Horizon", status: "Completed", value: 6200, due: "Done" },
];

export const freelancerOpportunities = [
  { id: "o1", title: "Hydraulic brake leak", park: "Adventureland Milano", priority: "critical", bidders: 3, posted: "2h ago" },
  { id: "o2", title: "Drive motor noise diagnostic", park: "Adventureland Milano", priority: "high", bidders: 1, posted: "5h ago" },
  { id: "o3", title: "PLC firmware update", park: "OceanPark Genova", priority: "medium", bidders: 5, posted: "1d ago" },
  { id: "o4", title: "Track inspection (annual)", park: "FunWorld Roma", priority: "low", bidders: 8, posted: "2d ago" },
];

export const uptimeTrend = [
  { month: "Jan", uptime: 96.2 },
  { month: "Feb", uptime: 97.0 },
  { month: "Mar", uptime: 95.8 },
  { month: "Apr", uptime: 97.6 },
  { month: "May", uptime: 98.1 },
  { month: "Jun", uptime: 97.9 },
  { month: "Jul", uptime: 98.4 },
];

export const failureBreakdown = [
  { name: "Hydraulics", value: 32 },
  { name: "Electrical", value: 24 },
  { name: "Mechanical", value: 21 },
  { name: "Software", value: 13 },
  { name: "Other", value: 10 },
];
