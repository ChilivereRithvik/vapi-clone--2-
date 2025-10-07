"use client";

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const settingsItems = [
  { label: "General", to: "/dashboard/settings" },
  { label: "Build and Deployment", to: "/dashboard/settings/build" },
  { label: "Domains", to: "/dashboard/settings/domains" },
  { label: "Environments", to: "/dashboard/settings/environments" },
  { label: "Environment Variables", to: "/dashboard/settings/env-vars" },
  { label: "Git", to: "/dashboard/settings/git" },
  { label: "Integrations", to: "/dashboard/settings/integrations" },
  { label: "Deployment Protection", to: "/dashboard/settings/protection" },
  { label: "Functions", to: "/dashboard/settings/functions" },
  { label: "Data Cache", to: "/dashboard/settings/cache" },
  { label: "Cron Jobs", to: "/dashboard/settings/cron" },
  { label: "Microfrontends", to: "/dashboard/settings/microfrontends" },
  { label: "Project Members", to: "/dashboard/settings/members" },
  { label: "Webhooks", to: "/dashboard/settings/webhooks" },
  { label: "Log Drains", to: "/dashboard/settings/logs" },
  { label: "Security", to: "/dashboard/settings/security" },
  { label: "Secure Compute", to: "/dashboard/settings/compute" },
  { label: "Advanced", to: "/dashboard/settings/advanced" },
];

export function SettingsSidebar() {
  // const pathname = usePathname();

  return (
    <aside className="w-64 space-y-4">
      <div>
        <h2 className="mb-4 text-xl font-bold">Project Settings</h2>
        <Link
          to="/dashboard/settings/team"
          className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Go to Team Settings
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search..." className="pl-9" />
      </div>

      <nav className="space-y-1">
        {settingsItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent bg-accent font-medium"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
