import type { Metadata } from "next";
import { AdminDashboard } from "@/components/sections/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
