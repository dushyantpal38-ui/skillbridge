"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardCheck,
  BarChart3,
  Briefcase,
  FileStack,
  UserCircle2,
  Settings,
  LogOut,
  Bell,
  ArrowUpRight,
  MapPin,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  FolderKanban,
} from "lucide-react";

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

type SkillLevel = "strong" | "average" | "critical";

interface Skill {
  name: string;
  score: number; // 0-100
  level: SkillLevel;
}

interface Opportunity {
  company: string;
  role: string;
  match: number;
  location: string;
  type: string;
}

type ApplicationStatus = "Applied" | "Under Review" | "Interview" | "Rejected";

interface Application {
  company: string;
  role: string;
  status: ApplicationStatus;
  appliedOn: string;
}

// ----------------------------------------------------------------------------
// Placeholder data
// ----------------------------------------------------------------------------

const studentName = "Rahul";
const readinessScore = 68;
const assessmentCompleted = true;

const skills: Skill[] = [
  { name: "React & Frontend Systems", score: 88, level: "strong" },
  { name: "Data Structures & Algorithms", score: 74, level: "strong" },
  { name: "SQL & Database Design", score: 56, level: "average" },
  { name: "System Design", score: 41, level: "critical" },
  { name: "Cloud & DevOps (AWS)", score: 33, level: "critical" },
];

const opportunities: Opportunity[] = [
  {
    company: "Nimbus Analytics",
    role: "Frontend Engineer Intern",
    match: 92,
    location: "Bengaluru, IN",
    type: "Internship",
  },
  {
    company: "Verta Systems",
    role: "Software Engineer I",
    match: 85,
    location: "Remote",
    type: "Full-time",
  },
  {
    company: "Orbital Labs",
    role: "Backend Developer Intern",
    match: 77,
    location: "Hyderabad, IN",
    type: "Internship",
  },
  {
    company: "Kestrel Cloud",
    role: "Platform Engineer Intern",
    match: 64,
    location: "Pune, IN",
    type: "Internship",
  },
];

const applications: Application[] = [
  {
    company: "Nimbus Analytics",
    role: "Frontend Engineer Intern",
    status: "Interview",
    appliedOn: "2 Sep",
  },
  {
    company: "Fieldstone Tech",
    role: "Software Engineer Intern",
    status: "Under Review",
    appliedOn: "28 Aug",
  },
  {
    company: "Harborline",
    role: "Data Analyst Intern",
    status: "Applied",
    appliedOn: "24 Aug",
  },
  {
    company: "Quorum Health",
    role: "Backend Developer Intern",
    status: "Rejected",
    appliedOn: "10 Aug",
  },
];

// ----------------------------------------------------------------------------
// Small presentational helpers
// ----------------------------------------------------------------------------

const levelColor: Record<SkillLevel, { bar: string; text: string; dot: string }> = {
  strong: { bar: "bg-emerald-500", text: "text-emerald-400", dot: "bg-emerald-500" },
  average: { bar: "bg-amber-500", text: "text-amber-400", dot: "bg-amber-500" },
  critical: { bar: "bg-red-500", text: "text-red-400", dot: "bg-red-500" },
};

const statusStyle: Record<ApplicationStatus, string> = {
  Applied: "bg-white/[0.06] text-white/70 border-white/10",
  "Under Review": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Interview: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

function MatchBadge({ match }: { match: number }) {
  const tone =
    match >= 85
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : match >= 70
      ? "bg-violet-500/10 text-violet-300 border-violet-500/20"
      : "bg-amber-500/10 text-amber-400 border-amber-500/20";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${tone}`}>
      {match}% match
    </span>
  );
}

function ReadinessRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-semibold text-white">{score}%</span>
        <span className="text-xs text-white/50">Readiness</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Sidebar
// ----------------------------------------------------------------------------

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Skill Assessment", icon: ClipboardCheck },
  { label: "Skill Gap Report", icon: BarChart3 },
  { label: "Opportunities", icon: Briefcase },
  { label: "My Applications", icon: FileStack },
  { label: "Digital Portfolio", icon: FolderKanban },
  { label: "Settings", icon: Settings },
];

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#0a0a0a] transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white">SkillBridge</span>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                item.active
                  ? "bg-violet-600/15 text-violet-300"
                  : "text-white/60 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <item.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/10 px-3 py-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/[0.04] hover:text-white">
            <LogOut className="h-[18px] w-[18px]" strokeWidth={1.8} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

// ----------------------------------------------------------------------------
// Header
// ----------------------------------------------------------------------------

function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-black/80 px-5 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="text-white/60 hover:text-white lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-white">Welcome back, {studentName}</h1>
          <p className="text-sm text-white/50">Here&apos;s where your career prep stands today.</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/20 hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" strokeWidth={1.8} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-500" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600/20 text-sm font-medium text-violet-300 ring-1 ring-white/10">
          {studentName.charAt(0)}
        </div>
      </div>
    </header>
  );
}

// ----------------------------------------------------------------------------
// Skill Assessment Status Card
// ----------------------------------------------------------------------------

function AssessmentStatusCard() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/50">Skill Assessment</p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${assessmentCompleted ? "bg-emerald-500" : "bg-amber-500"}`}
            />
            <span className="text-base font-medium text-white">
              {assessmentCompleted ? "Completed" : "Not started"}
            </span>
          </div>
          <p className="mt-1 text-sm text-white/50">
            {assessmentCompleted
              ? "Last taken on 28 August 2026"
              : "Takes about 25 minutes to complete"}
          </p>
        </div>
      </div>
      <button className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500">
        {assessmentCompleted ? "View Report" : "Take Assessment"}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// ----------------------------------------------------------------------------
// AI Skill Gap Summary
// ----------------------------------------------------------------------------

function SkillGapSummary() {
  const strengths = skills.filter((s) => s.level === "strong").slice(0, 2);
  const gaps = skills.filter((s) => s.level === "critical");

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-6 lg:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/50">AI Skill Gap Summary</p>
          <h2 className="mt-1 text-base font-medium text-white">Your readiness at a glance</h2>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
        <ReadinessRing score={readinessScore} />

        <div className="w-full space-y-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-white/80">{skill.name}</span>
                <span className={levelColor[skill.level].text}>{skill.score}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-full rounded-full ${levelColor[skill.level].bar}`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
        <div>
          <p className="text-xs text-white/50">Top strengths</p>
          <ul className="mt-2 space-y-1.5">
            {strengths.map((s) => (
              <li key={s.name} className="flex items-center gap-2 text-sm text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {s.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs text-white/50">Critical gaps</p>
          <ul className="mt-2 space-y-1.5">
            {gaps.map((s) => (
              <li key={s.name} className="flex items-center gap-2 text-sm text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Recommended Opportunities
// ----------------------------------------------------------------------------

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <div className="group rounded-xl border border-white/10 bg-[#0a0a0a] p-5 transition-colors hover:border-white/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">{opportunity.role}</p>
          <p className="mt-0.5 text-sm text-white/50">{opportunity.company}</p>
        </div>
        <MatchBadge match={opportunity.match} />
      </div>

      <div className="mt-4 flex items-center gap-3 text-xs text-white/50">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {opportunity.location}
        </span>
        <span className="h-1 w-1 rounded-full bg-white/20" />
        <span>{opportunity.type}</span>
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors group-hover:border-violet-500/40 group-hover:bg-violet-600/10 group-hover:text-violet-300">
        Apply Now
        <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function RecommendedOpportunities() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-white">Recommended for you</h2>
        <button className="flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-white">
          View all
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {opportunities.map((o) => (
          <OpportunityCard key={o.company + o.role} opportunity={o} />
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// My Applications
// ----------------------------------------------------------------------------

function ApplicationsTracker() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-white">My Applications</h2>
        <button className="flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-white">
          View all
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {applications.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-white/10 py-10 text-center">
          <FileStack className="h-6 w-6 text-white/30" strokeWidth={1.5} />
          <p className="mt-3 text-sm text-white/60">No applications yet</p>
          <p className="mt-1 text-xs text-white/40">Browse opportunities matched to your skills to get started</p>
        </div>
      ) : (
        <div className="mt-4 divide-y divide-white/10">
          {applications.map((app) => (
            <div key={app.company + app.role} className="flex items-center justify-between py-3.5">
              <div>
                <p className="text-sm font-medium text-white">{app.role}</p>
                <p className="mt-0.5 text-xs text-white/50">
                  {app.company} · Applied {app.appliedOn}
                </p>
              </div>
              <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyle[app.status]}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Quick Actions
// ----------------------------------------------------------------------------

function QuickActions() {
  const actions = [
    { label: "Take Skill Assessment", icon: ClipboardCheck },
    { label: "Update Portfolio", icon: FolderKanban },
    { label: "Browse Opportunities", icon: Briefcase },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-6">
      <h2 className="text-base font-medium text-white">Quick Actions</h2>
      <div className="mt-4 space-y-2">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex w-full items-center gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm text-white/80 transition-colors hover:border-violet-500/40 hover:bg-violet-600/10 hover:text-white"
          >
            <action.icon className="h-4 w-4" strokeWidth={1.8} />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Main export
// ----------------------------------------------------------------------------

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col lg:pl-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 space-y-6 px-5 py-6 lg:px-8 lg:py-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <AssessmentStatusCard />
            <SkillGapSummary />
          </div>

          <RecommendedOpportunities />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ApplicationsTracker />
            </div>
            <QuickActions />
          </div>
        </main>
      </div>
    </div>
  );
}
