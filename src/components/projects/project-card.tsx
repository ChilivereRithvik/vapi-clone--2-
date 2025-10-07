// import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLink, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  name: string;
  url: string;
  framework: string;
  status: string;
  lastDeployed: string;
  production: boolean;
}

export function ProjectCard({ project }: { project: Project }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-500";
      case "Building":
        return "bg-yellow-500";
      case "Error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="group transition-all hover:border-foreground/20">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <svg viewBox="0 0 76 65" fill="currentColor" className="h-5 w-5">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          </div>
          <div>
            <Link to={`/dashboard`} className="font-semibold hover:underline">
              {project.name}
            </Link>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{project.framework}</span>
              {project.production && (
                <>
                  <span>•</span>
                  <span className="text-blue-600">Production</span>
                </>
              )}
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Project</DropdownMenuItem>
            <DropdownMenuItem>View Deployments</DropdownMenuItem>
            <DropdownMenuItem>Project Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`}
          />
          <span className="text-sm font-medium">{project.status}</span>
          <span className="text-xs text-muted-foreground">
            • {project.lastDeployed}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ExternalLink className="h-3 w-3" />
          <Link
            to={`https://${project.url}`}
            className="truncate hover:underline"
            target="_blank"
          >
            {project.url}
          </Link>
        </div>
        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            Visit
          </Button>
          <Button size="sm" className="flex-1">
            Deploy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
