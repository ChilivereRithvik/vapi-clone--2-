import { ProjectsLayout } from "@/components/projects/projects-layout";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      name: "v0",
      url: "v0-production.vercel.app",
      framework: "Next.js",
      status: "Ready",
      lastDeployed: "2h ago",
      production: true,
    },
    {
      name: "v0chat",
      url: "v0chat.vercel.app",
      framework: "Next.js",
      status: "Ready",
      lastDeployed: "5h ago",
      production: true,
    },
    {
      name: "portfolio",
      url: "portfolio-preview.vercel.app",
      framework: "Next.js",
      status: "Building",
      lastDeployed: "1m ago",
      production: false,
    },
    {
      name: "docs",
      url: "docs.vercel.app",
      framework: "Next.js",
      status: "Ready",
      lastDeployed: "1d ago",
      production: true,
    },
    {
      name: "api-service",
      url: "api.vercel.app",
      framework: "Node.js",
      status: "Ready",
      lastDeployed: "3d ago",
      production: true,
    },
    {
      name: "landing-page",
      url: "landing.vercel.app",
      framework: "React",
      status: "Error",
      lastDeployed: "2d ago",
      production: false,
    },
  ];

  return (
    <ProjectsLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="text-sm text-muted-foreground">
              Manage and deploy your projects
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-9" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </ProjectsLayout>
  );
}
