import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center">
              <svg viewBox="0 0 76 65" fill="currentColor" className="h-5 w-5">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
            </div>
            <span className="text-lg font-semibold">Vercel</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Resources
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Enterprise
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Log In
          </Link>
          <Button size="sm" className="rounded-full">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
