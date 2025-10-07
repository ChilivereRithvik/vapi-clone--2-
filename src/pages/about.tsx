import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Target, Users, Zap, Globe } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Mission-driven",
    description: "We're on a mission to make voice AI accessible to every developer and business.",
  },
  {
    icon: Users,
    title: "Customer-first",
    description: "Our customers' success is our success. We build features based on real user needs.",
  },
  {
    icon: Zap,
    title: "Move fast",
    description: "We ship quickly and iterate based on feedback. Speed is a feature.",
  },
  {
    icon: Globe,
    title: "Global impact",
    description: "Building technology that works for everyone, everywhere.",
  },
]

const team = [
  { name: "Alex Johnson", role: "CEO & Co-founder", initials: "AJ" },
  { name: "Sarah Chen", role: "CTO & Co-founder", initials: "SC" },
  { name: "Michael Rodriguez", role: "Head of Engineering", initials: "MR" },
  { name: "Emily Watson", role: "Head of Product", initials: "EW" },
  { name: "David Kim", role: "Head of Design", initials: "DK" },
  { name: "Lisa Anderson", role: "Head of Sales", initials: "LA" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl">
              Building the future of voice AI
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              We're a team of engineers, designers, and AI researchers passionate about making voice AI accessible to
              everyone.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Our story</h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              VoiceAI was founded in 2023 by a team of engineers who experienced firsthand the challenges of building
              voice AI applications. We spent months integrating multiple APIs, managing infrastructure, and debugging
              latency issues.
            </p>
            <p>
              We knew there had to be a better way. So we built VoiceAI - a platform that handles all the complexity of
              voice AI, letting developers focus on building great experiences instead of managing infrastructure.
            </p>
            <p>
              Today, we're proud to power thousands of voice AI applications across industries, from customer service to
              healthcare to education. We're just getting started.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Our values</h2>
            <p className="mt-4 text-lg text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="text-center">
                  <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="mt-2 text-muted-foreground">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Meet the team</h2>
            <p className="mt-4 text-lg text-muted-foreground">We're a diverse team of builders from around the world</p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-accent/10">
                  <span className="text-2xl font-bold text-accent">{member.initials}</span>
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
