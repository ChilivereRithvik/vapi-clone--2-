import type React from "react";
import { Link } from "react-router-dom";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b border-border px-6">
        <Link to="/" className="flex items-center gap-2">
          <svg viewBox="0 0 76 65" fill="currentColor" className="h-5 w-5">
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
          </svg>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/signup"
            className="text-sm font-medium hover:text-foreground transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-6">
        {children}
      </main>
      <footer className="border-t border-border px-6 py-8">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <svg viewBox="0 0 76 65" fill="currentColor" className="h-4 w-4">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
            Home
          </Link>
          <Link
            to="/docs"
            className="hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <Link
            to="/guides"
            className="hover:text-foreground transition-colors"
          >
            Guides
          </Link>
          <Link
            to="/help"
            className="hover:text-foreground transition-colors"
          >
            Help
          </Link>
          <Link
            to="/contact"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </Link>
          <button className="hover:text-foreground transition-colors">
            Legal
          </button>
        </div>
      </footer>
    </div>
  );
}
