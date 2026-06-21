"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, CalendarDays, FileText,
  Images, TrendingUp, Utensils, ArrowUpRight,
} from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Volunteers", icon: Users },
  { label: "Events", icon: CalendarDays },
  { label: "Blog CMS", icon: FileText },
  { label: "Gallery", icon: Images },
];

type Kpi = {
  label: string;
  value: number;
  icon: typeof Users;
  trend: string;
  accent: "brand" | "gold" | "mint";
  prefix?: string;
};

const kpis: Kpi[] = [
  { label: "Total Volunteers", value: 512, icon: Users, trend: "+12%", accent: "brand" },
  { label: "Meals This Month", value: 14_200, icon: Utensils, trend: "+23%", accent: "gold" },
  { label: "Active Events", value: 6, icon: CalendarDays, trend: "+2", accent: "mint" },
  { label: "Villages Reached", value: 52, icon: TrendingUp, trend: "+4", accent: "brand" },
];

const signupsByMonth = [40, 55, 48, 62, 70, 65, 80, 76, 90, 85, 95, 100];
const recentVolunteers = [
  { name: "Anjali Das", city: "Dhekiajuli", skill: "Teaching", when: "2h ago" },
  { name: "Rofiqul Islam", city: "Tezpur", skill: "Logistics", when: "5h ago" },
  { name: "Priya Sharma", city: "Guwahati", skill: "Medical", when: "1d ago" },
  { name: "Bikash Bora", city: "Sonitpur", skill: "Photography", when: "1d ago" },
  { name: "Meera Nath", city: "Biswanath", skill: "Counselling", when: "2d ago" },
];

const accentBg: Record<string, string> = {
  brand: "bg-brand/10 text-brand",
  gold: "bg-gold/15 text-gold-dark",
  mint: "bg-mint/10 text-mint-dark",
};

export function AdminDashboard() {
  const [active, setActive] = useState("Overview");

  return (
    <div className="min-h-screen bg-canvas pt-24">
      <div className="container-px py-8">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit rounded-4xl border border-ink/5 bg-white p-4 shadow-soft lg:sticky lg:top-24">
            <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-widest text-ink/40">
              Admin Panel
            </p>
            <nav className="space-y-1">
              {nav.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActive(item.label)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition",
                    active === item.label ? "bg-brand text-white shadow-soft" : "text-ink/60 hover:bg-ink/5",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-3xl font-semibold">{active}</h1>
                <p className="text-sm text-ink/50">Welcome back — here&apos;s what&apos;s happening.</p>
              </div>
              <span className="rounded-full bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint-dark">
                ● Live demo data
              </span>
            </div>

            {/* KPIs */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {kpis.map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-4xl border border-ink/5 bg-white p-5 shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <span className={cn("flex h-10 w-10 items-center justify-center rounded-2xl", accentBg[kpi.accent])}>
                      <kpi.icon className="h-5 w-5" />
                    </span>
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-mint-dark">
                      <ArrowUpRight className="h-3.5 w-3.5" /> {kpi.trend}
                    </span>
                  </div>
                  <Counter
                    value={kpi.value}
                    prefix={kpi.prefix ?? ""}
                    className="mt-4 block font-display text-3xl font-semibold"
                  />
                  <p className="mt-1 text-sm text-ink/50">{kpi.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Chart + table */}
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="rounded-4xl border border-ink/5 bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">Volunteer Signups — Last 12 Months</h3>
                  <span className="text-sm font-semibold text-brand">+512 total</span>
                </div>
                <div className="mt-8 flex h-48 items-end gap-2">
                  {signupsByMonth.map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${v}%` }}
                      transition={{ delay: i * 0.04, duration: 0.6, ease: "easeOut" }}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-brand to-mint"
                      title={`Month ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-4xl border border-ink/5 bg-white p-6 shadow-soft">
                <h3 className="font-display text-lg font-semibold">Recent Volunteers</h3>
                <ul className="mt-4 space-y-3">
                  {recentVolunteers.map((v) => (
                    <li key={v.name} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                        {v.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{v.name}</p>
                        <p className="text-xs text-ink/45">{v.skill} · {v.city}</p>
                      </div>
                      <span className="text-xs text-ink/40">{v.when}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="rounded-3xl border border-dashed border-ink/15 p-4 text-center text-xs text-ink/40">
              This dashboard renders demo data. Wire the cards to Supabase queries
              (server components or React Query) and protect this route with Supabase Auth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
