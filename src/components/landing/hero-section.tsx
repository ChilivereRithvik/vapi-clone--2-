import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="container flex flex-col items-center justify-center gap-8 py-24 md:py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-sm">
          <span className="text-xs font-medium">New</span>
          <span className="text-muted-foreground">AI Gateway is now generally available</span>
          <ArrowRight className="h-3 w-3" />
        </div>
        <h1 className="max-w-4xl text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Build and deploy on the AI Cloud.
        </h1>
        <p className="max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
          Vercel provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more
          personalized web.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button size="lg" className="rounded-full">
            Start Deploying
          </Button>
          <Button size="lg" variant="outline" className="rounded-full bg-transparent">
            Get a Demo
          </Button>
        </div>
      </div>

      <div className="relative mt-8 w-full max-w-5xl">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 to-cyan-400 opacity-30 blur-3xl" />
        <div className="relative flex items-center justify-center rounded-lg border border-border bg-card p-12">
          <div className="flex h-48 w-48 items-center justify-center">
            <svg viewBox="0 0 76 65" fill="currentColor" className="h-32 w-32">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
