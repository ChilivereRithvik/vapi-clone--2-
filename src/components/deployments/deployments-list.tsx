import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GitBranch, MoreHorizontal } from "lucide-react"

const deployments = [
  {
    id: "8JfpcWAW",
    environment: "Preview",
    status: "Ready",
    duration: "7m 24s",
    timeAgo: "12m ago",
    branch: "max/05-10-image-ui",
    commit: "15852de",
    commitMessage: "fix",
    author: "MaxLeiter",
    authorInitials: "ML",
  },
  {
    id: "BCotKPg4n",
    environment: "Production",
    status: "Ready",
    duration: "5m 2s",
    timeAgo: "38m ago",
    branch: "main",
    commit: "b76b5a7",
    commitMessage: "set metadata on project creation (#1...",
    author: "aryamankha",
    authorInitials: "AK",
    isCurrent: true,
  },
  {
    id: "1i3VpKTef",
    environment: "Preview",
    status: "Ready",
    duration: "6m 19s",
    timeAgo: "1h ago",
    branch: "set-metadata",
    commit: "67d0c9f",
    commitMessage: "set metadata on project creation",
    author: "aryamankha",
    authorInitials: "AK",
  },
  {
    id: "3meKh6Dve",
    environment: "Production",
    status: "Ready",
    duration: "4m 46s",
    timeAgo: "2h ago",
    branch: "main",
    commit: "3b8b99c",
    commitMessage: "add library check in frame (#10759)",
    author: "aryamankha",
    authorInitials: "AK",
  },
  {
    id: "EdKwQtYgv",
    environment: "Preview",
    status: "Ready",
    duration: "5m 64s",
    timeAgo: "2h ago",
    branch: "ldo/05-15-blocks",
    commit: "e02880e",
    commitMessage: "Merge branch 'main' into ldo/05-15-...",
    author: "ldoPesok",
    authorInitials: "LP",
  },
  {
    id: "5QD2vLFUg",
    environment: "Preview",
    status: "Ready",
    duration: "4m 46s",
    timeAgo: "2h ago",
    branch: "ldo/05-15-blocks",
    commit: "1b5bd14",
    commitMessage: "wip",
    author: "ldoPesok",
    authorInitials: "LP",
  },
  {
    id: "ASY6eu74z",
    environment: "Production",
    status: "Ready",
    duration: "5m 17s",
    timeAgo: "2h ago",
    branch: "main",
    commit: "f529bd4",
    commitMessage: "Ensure Block Source On Block Swit...",
    author: "ldoPesok",
    authorInitials: "LP",
  },
  {
    id: "8yPLLeuv9",
    environment: "Preview",
    status: "Ready",
    duration: "6m 13s",
    timeAgo: "2h ago",
    branch: "max/05-15-topups-2",
    commit: "67a23a9",
    commitMessage: "types",
    author: "MaxLeiter",
    authorInitials: "ML",
  },
]

export function DeploymentsList() {
  return (
    <div className="space-y-2">
      {deployments.map((deployment) => (
        <div
          key={deployment.id}
          className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
        >
          <div className="flex flex-1 items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <svg viewBox="0 0 76 65" fill="currentColor" className="h-5 w-5">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-medium">{deployment.id}</span>
                <span className="text-xs text-muted-foreground">{deployment.environment}</span>
                {deployment.isCurrent && (
                  <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">Current</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <GitBranch className="h-3 w-3" />
                  <span className="font-mono text-xs">{deployment.branch}</span>
                </div>
                <span>•</span>
                <span className="font-mono text-xs">{deployment.commit}</span>
                <span className="truncate">{deployment.commitMessage}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium">{deployment.status}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {deployment.duration} ({deployment.timeAgo})
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {deployment.timeAgo} by {deployment.author}
              </span>
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">{deployment.authorInitials}</AvatarFallback>
              </Avatar>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Visit Deployment</DropdownMenuItem>
                <DropdownMenuItem>View Build Logs</DropdownMenuItem>
                <DropdownMenuItem>Promote to Production</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Redeploy</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}
