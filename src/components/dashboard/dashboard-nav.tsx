"use client";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Project" },
  { href: "/dashboard/deployments", label: "Deployments" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/speed-insights", label: "Speed Insights" },
  { href: "/dashboard/logs", label: "Logs" },
  { href: "/dashboard/observability", label: "Observability" },
  { href: "/dashboard/firewall", label: "Firewall" },
  { href: "/dashboard/storage", label: "Storage" },
  { href: "/dashboard/flags", label: "Flags" },
  { href: "/dashboard/native-flags", label: "Native Flags" },
  { href: "/dashboard/ai", label: "AI" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function DashboardNav() {
  return (
    <nav className="border-b border-border bg-background">
      <div className="flex items-center gap-1 overflow-x-auto px-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "whitespace-nowrap border-b-2 border-transparent px-3 py-3 text-sm font-medium transition-colors hover:text-foreground",
              "text-muted-foreground hover:border-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
