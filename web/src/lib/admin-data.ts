import { brandProfiles } from "@/lib/brand-data";
import { creatorProfiles } from "@/lib/creator-data";
import { conversations } from "@/lib/message-data";

export interface AdminStat {
  key: string;
  label: string;
  value: string;
  tone: string;
}

export interface AdminApprovalItem {
  id: string;
  name: string;
  role: "Creator" | "Brand";
  location: string;
  status: string;
  submittedAt: string;
}

export interface AdminUserItem {
  id: string;
  name: string;
  role: "Creator" | "Brand" | "Admin";
  email: string;
  status: string;
  location: string;
}

export interface AdminSettingItem {
  label: string;
  value: string;
}

export const adminStats: AdminStat[] = [
  { key: "creators", label: "Creators", value: "500+", tone: "from-primary-600 to-secondary" },
  { key: "brands", label: "Brands", value: "120+", tone: "from-accent-pink to-primary-600" },
  { key: "pending", label: "Pending approvals", value: "18", tone: "from-gold to-accent-pink" },
  { key: "approved", label: "Approved this week", value: "42", tone: "from-success to-secondary" },
];

export const adminApprovals: AdminApprovalItem[] = [
  { id: "appr-1", name: "Sentila Jamir", role: "Creator", location: "Kohima, Nagaland", status: "Pending review", submittedAt: "2h ago" },
  { id: "appr-2", name: "NorthEats", role: "Brand", location: "Shillong, Meghalaya", status: "Needs more details", submittedAt: "4h ago" },
  { id: "appr-3", name: "Rahul Boruah", role: "Creator", location: "Guwahati, Assam", status: "Pending review", submittedAt: "6h ago" },
  { id: "appr-4", name: "TrailPulse", role: "Brand", location: "Gangtok, Sikkim", status: "Ready to approve", submittedAt: "9h ago" },
];

export const adminUsers: AdminUserItem[] = [
  { id: "user-creator-1", name: "Sentila Jamir", role: "Creator", email: "sentila@example.com", status: "Approved", location: "Nagaland" },
  { id: "user-creator-2", name: "Rahul Boruah", role: "Creator", email: "rahul@example.com", status: "Approved", location: "Assam" },
  { id: "user-brand-1", name: "NorthEats", role: "Brand", email: "hello@northeats.example", status: "Approved", location: "Meghalaya" },
  { id: "user-admin-1", name: "CreatorNE Admin", role: "Admin", email: "admin@creatorne.in", status: "Active", location: "Remote" },
];

export const adminSettings: AdminSettingItem[] = [
  { label: "Homepage stats source", value: "Seeded + Prisma ready" },
  { label: "Featured creators", value: `${creatorProfiles.length} seeded profiles` },
  { label: "Featured brands", value: `${brandProfiles.length} seeded profiles` },
  { label: "Conversations", value: `${conversations.length} active threads` },
  { label: "Approval workflow", value: "PENDING → APPROVED / REJECTED" },
];