import { Mic, Users, Zap, BarChart3, Shield, Workflow } from "lucide-react"

const features = [
  {
    icon: Mic,
    title: "Voice Agents",
    description:
      "Create intelligent voice agents that understand context and respond naturally in real-time conversations.",
  },
  {
    icon: Users,
    title: "Voice Squads",
    description: "Orchestrate multiple AI agents working together to handle complex multi-step conversations.",
  },
  {
    icon: Zap,
    title: "Real-time AI",
    description: "Ultra-low latency responses with streaming capabilities for natural, human-like interactions.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Deep insights into call performance, user intents, drop rates, and conversation quality metrics.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant infrastructure with end-to-end encryption and data privacy controls.",
  },
  {
    icon: Workflow,
    title: "Workflow Tools",
    description: "Visual workflow builder to design complex conversation flows without writing code.",
  },
]

export function Features() {
  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to build voice AI</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features that scale from prototype to production
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative rounded-lg border border-border bg-card p-6 hover:border-accent/50 transition-colors"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
