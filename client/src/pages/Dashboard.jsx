import React from "react";
import {
  Briefcase,
  CalendarCheck,
  Trophy,
  XCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreHorizontal,
  Bookmark,
  Send,
  ClipboardCheck,
  Users,
  Award,
} from "lucide-react";
 
/* ------------------------------------------------------------------ */
/* Mock data                                                          */
/* ------------------------------------------------------------------ */
 
const STATS = [
  {
    label: "Applications",
    value: 128,
    delta: "+12%",
    trend: "up",
    period: "vs last month",
    icon: Briefcase,
  },
  {
    label: "Interviews",
    value: 24,
    delta: "+8%",
    trend: "up",
    period: "vs last month",
    icon: CalendarCheck,
  },
  {
    label: "Offers",
    value: 5,
    delta: "+2",
    trend: "up",
    period: "vs last month",
    icon: Trophy,
  },
  {
    label: "Rejected",
    value: 41,
    delta: "-4%",
    trend: "down",
    period: "vs last month",
    icon: XCircle,
  },
];
 
const PIPELINE = [
  { label: "Saved", count: 128, icon: Bookmark },
  { label: "Applied", count: 96, icon: Send },
  { label: "OA", count: 47, icon: ClipboardCheck },
  { label: "Interview", count: 24, icon: Users },
  { label: "Offer", count: 5, icon: Award },
];
 
const STATUS_STYLES = {
  Saved: "bg-gray-500/10 text-gray-400 ring-1 ring-gray-500/20",
  Applied: "bg-[#3B82F6]/10 text-[#3B82F6] ring-1 ring-[#3B82F6]/20",
  OA: "bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20",
  Interview: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20",
  Offer: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
  Rejected: "bg-red-500/10 text-red-400 ring-1 ring-red-500/20",
};
 
const RECENT_APPLICATIONS = [
  {
    company: "Stripe",
    role: "Software Engineer Intern",
    status: "Interview",
    date: "Jul 09, 2026",
    initials: "ST",
    color: "bg-indigo-500/15 text-indigo-400",
  },
  {
    company: "Notion",
    role: "Product Design Intern",
    status: "Applied",
    date: "Jul 08, 2026",
    initials: "NO",
    color: "bg-gray-500/15 text-gray-300",
  },
  {
    company: "Figma",
    role: "Frontend Engineer Intern",
    status: "OA",
    date: "Jul 06, 2026",
    initials: "FI",
    color: "bg-fuchsia-500/15 text-fuchsia-400",
  },
  {
    company: "Google",
    role: "STEP Intern",
    status: "Offer",
    date: "Jul 03, 2026",
    initials: "GO",
    color: "bg-blue-500/15 text-blue-400",
  },
  {
    company: "Amazon",
    role: "SDE Intern",
    status: "Rejected",
    date: "Jun 29, 2026",
    initials: "AM",
    color: "bg-orange-500/15 text-orange-400",
  },
  {
    company: "Airbnb",
    role: "Data Analyst Intern",
    status: "Applied",
    date: "Jun 27, 2026",
    initials: "AI",
    color: "bg-rose-500/15 text-rose-400",
  },
];
 
const TOP_COMPANIES = [
  { name: "Google", applications: 6, initials: "GO", color: "bg-blue-500/15 text-blue-400" },
  { name: "Stripe", applications: 5, initials: "ST", color: "bg-indigo-500/15 text-indigo-400" },
  { name: "Amazon", applications: 4, initials: "AM", color: "bg-orange-500/15 text-orange-400" },
  { name: "Microsoft", applications: 4, initials: "MS", color: "bg-teal-500/15 text-teal-400" },
  { name: "Notion", applications: 3, initials: "NO", color: "bg-gray-500/15 text-gray-300" },
];
 
/* ------------------------------------------------------------------ */
/* Subcomponents                                                      */
/* ------------------------------------------------------------------ */
 
function StatCard({ label, value, delta, trend, period, icon: Icon }) {
  const isUp = trend === "up";
  return (
    <div className="rounded-2xl border border-[#222222] bg-[#111111] p-5 transition-colors hover:border-[#2a2a2a]">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/10">
          <Icon size={18} className="text-[#3B82F6]" strokeWidth={2} />
        </div>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-1 font-['Inter',_sans-serif] text-xs font-medium ${
            isUp ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
          }`}
        >
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {delta}
        </span>
      </div>
 
      <p className="mt-4 font-['Sora',_sans-serif] text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>
      <p className="mt-1 font-['Inter',_sans-serif] text-sm text-gray-500">{label}</p>
      <p className="mt-3 font-['Inter',_sans-serif] text-xs text-gray-600">{period}</p>
    </div>
  );
}
 
function PipelineStage({ label, count, icon: Icon, isLast, maxCount }) {
  const heightPct = Math.max((count / maxCount) * 100, 8);
  return (
    <div className="flex flex-1 items-center">
      <div className="flex flex-1 flex-col items-center gap-3">
        <div className="flex h-24 w-full items-end justify-center rounded-xl bg-white/[0.02] px-2 pb-0">
          <div
            className="w-full max-w-[52px] rounded-t-lg bg-gradient-to-t from-[#3B82F6]/30 to-[#3B82F6] transition-all duration-300"
            style={{ height: `${heightPct}%` }}
          />
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Icon size={14} strokeWidth={2} />
            <span className="font-['Inter',_sans-serif] text-xs font-medium">{label}</span>
          </div>
          <span className="font-['Sora',_sans-serif] text-lg font-semibold text-white">{count}</span>
        </div>
      </div>
 
      {!isLast && (
        <div className="mb-9 hidden h-px w-6 shrink-0 bg-[#222222] sm:block md:w-8" aria-hidden="true" />
      )}
    </div>
  );
}
 
/* ------------------------------------------------------------------ */
/* Dashboard                                                          */
/* ------------------------------------------------------------------ */
 
export default function Dashboard() {
  const maxCount = Math.max(...PIPELINE.map((s) => s.count));
 
  return (
    <div className="flex flex-col gap-6">
      {/* Page intro */}
      <div>
        <h2 className="font-['Sora',_sans-serif] text-xl font-semibold tracking-tight text-white">
          Welcome back
        </h2>
        <p className="mt-1 font-['Inter',_sans-serif] text-sm text-gray-500">
          Here&apos;s how your internship search is going.
        </p>
      </div>
 
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
 
      {/* Pipeline */}
      <div className="rounded-2xl border border-[#222222] bg-[#111111] p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-['Sora',_sans-serif] text-base font-semibold text-white">
              Application Pipeline
            </h3>
            <p className="mt-1 font-['Inter',_sans-serif] text-sm text-gray-500">
              Where your applications currently stand
            </p>
          </div>
          <button
            type="button"
            className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="More options"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
 
        <div className="mt-6 flex items-end sm:mt-8">
          {PIPELINE.map((stage, i) => (
            <PipelineStage
              key={stage.label}
              {...stage}
              maxCount={maxCount}
              isLast={i === PIPELINE.length - 1}
            />
          ))}
        </div>
      </div>
 
      {/* Table + Top companies */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent applications */}
        <div className="rounded-2xl border border-[#222222] bg-[#111111] lg:col-span-2">
          <div className="flex items-center justify-between border-b border-[#222222] px-5 py-4 sm:px-6">
            <h3 className="font-['Sora',_sans-serif] text-base font-semibold text-white">
              Recent Applications
            </h3>
            <button
              type="button"
              className="flex items-center gap-1 font-['Inter',_sans-serif] text-sm font-medium text-[#3B82F6] transition-colors hover:text-[#60A5FA]"
            >
              View all
              <ArrowUpRight size={14} />
            </button>
          </div>
 
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="font-['Inter',_sans-serif] text-xs text-gray-500">
                  <th className="px-5 py-3 font-medium sm:px-6">Company</th>
                  <th className="px-5 py-3 font-medium sm:px-6">Role</th>
                  <th className="px-5 py-3 font-medium sm:px-6">Status</th>
                  <th className="px-5 py-3 font-medium sm:px-6">Date</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_APPLICATIONS.map((app) => (
                  <tr
                    key={`${app.company}-${app.role}`}
                    className="border-t border-[#1a1a1a] transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-['Sora',_sans-serif] text-[11px] font-semibold ${app.color}`}
                        >
                          {app.initials}
                        </span>
                        <span className="font-['Inter',_sans-serif] text-sm font-medium text-white">
                          {app.company}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-['Inter',_sans-serif] text-sm text-gray-400 sm:px-6">
                      {app.role}
                    </td>
                    <td className="px-5 py-3.5 sm:px-6">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 font-['Inter',_sans-serif] text-xs font-medium ${STATUS_STYLES[app.status]}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-['Inter',_sans-serif] text-sm text-gray-500 sm:px-6">
                      {app.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
 
        {/* Top companies */}
        <div className="rounded-2xl border border-[#222222] bg-[#111111]">
          <div className="border-b border-[#222222] px-5 py-4 sm:px-6">
            <h3 className="font-['Sora',_sans-serif] text-base font-semibold text-white">
              Top Companies
            </h3>
            <p className="mt-1 font-['Inter',_sans-serif] text-sm text-gray-500">
              By number of applications
            </p>
          </div>
 
          <ul className="divide-y divide-[#1a1a1a] px-2 py-2 sm:px-3">
            {TOP_COMPANIES.map((company, i) => (
              <li
                key={company.name}
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-3">
                  <span className="w-4 font-['Inter',_sans-serif] text-xs text-gray-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-xl font-['Sora',_sans-serif] text-[11px] font-semibold ${company.color}`}
                  >
                    {company.initials}
                  </span>
                  <span className="font-['Inter',_sans-serif] text-sm font-medium text-white">
                    {company.name}
                  </span>
                </div>
                <span className="font-['Inter',_sans-serif] text-sm text-gray-500">
                  {company.applications}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}