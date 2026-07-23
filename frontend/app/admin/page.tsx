import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | TravelNest",
  description: "TravelNest hotel booking administration dashboard",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
