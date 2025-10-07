import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Mic,
  Users,
  Zap,
  BarChart3,
  Shield,
  Workflow,
  Phone,
  Globe,
  Code,
  MessageSquare,
  Brain,
  Settings,
} from "lucide-react"

const features = [
  {
    icon: Mic,
    title: "Voice Agents",
    description:
      "Build intelligent voice agents that understand context, handle interruptions, and respond naturally. Powered by the latest LLMs with custom function calling.",
    features: [
      "Natural language understanding",
      "Context awareness",
      "Custom function calling",
      "Multi-language support",
    ],
  },
  {
    icon: Users,
    title: "Voice Squads",
    description:
      "Orchestrate multiple AI agents working together. Transfer calls between agents, handle complex workflows, and provide specialized expertise.",
    features: ["Multi-agent orchestration", "Seamless transfers", "Specialized roles", "Collaborative workflows"],
  },
  {
    icon: Zap,
    title: "Real-time AI",
    description:
      "Ultra-low latency responses with streaming capabilities. Sub-second response times for natural, human-like conversations.",
    features: ["< 500ms latency", "Streaming responses", "Interrupt handling", "Natural pauses"],
  },
  {
    icon: Phone,
    title: "Telephony",
    description:
      "Make and receive calls with built-in telephony. Support for phone numbers, SIP trunking, and PSTN connectivity.",
    features: ["Inbound & outbound calls", "Phone number provisioning", "SIP support", "Call recording"],
  },
  {
    icon: Workflow,
    title: "Workflow Tools",
    description:
      "Visual workflow builder to design complex conversation flows. No code required for basic flows, full code access for advanced use cases.",
    features: ["Visual flow builder", "Conditional logic", "API integrations", "Custom functions"],
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Deep insights into call performance, user intents, drop rates, and conversation quality. Real-time dashboards and historical reports.",
    features: ["Call metrics", "Intent analysis", "Quality scoring", "Custom reports"],
  },
  {
    icon: Brain,
    title: "LLM Flexibility",
    description:
      "Choose from multiple LLM providers including OpenAI, Anthropic, Google, and more. Switch providers without changing your code.",
    features: ["Multi-provider support", "Model switching", "Custom prompts", "Fine-tuning support"],
  },
  {
    icon: MessageSquare,
    title: "STT & TTS",
    description:
      "Best-in-class speech-to-text and text-to-speech. Support for multiple providers and custom voice cloning.",
    features: ["Multiple STT providers", "Custom voices", "Voice cloning", "Accent support"],
  },
  {
    icon: Code,
    title: "Developer Experience",
    description:
      "Simple APIs, comprehensive SDKs, and detailed documentation. Get started in minutes with our quickstart guides.",
    features: ["REST & WebSocket APIs", "TypeScript SDK", "Python SDK", "Code examples"],
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Deploy globally with edge locations worldwide. Low latency for users anywhere in the world.",
    features: ["Global edge network", "Auto-scaling", "99.9% uptime SLA", "DDoS protection"],
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified with end-to-end encryption. HIPAA and GDPR compliant infrastructure.",
    features: ["SOC 2 certified", "End-to-end encryption", "HIPAA compliant", "GDPR compliant"],
  },
  {
    icon: Settings,
    title: "Integrations",
    description:
      "Connect with your existing tools and services. Pre-built integrations with popular CRMs, databases, and APIs.",
    features: ["CRM integrations", "Database connectors", "Webhook support", "Custom integrations"],
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl">
              Everything you need to build voice AI
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              Powerful features that scale from prototype to production. Build, deploy, and manage voice AI agents with
              enterprise-grade infrastructure.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:gap-16">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className={`grid gap-8 lg:grid-cols-2 lg:gap-16 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className={`flex flex-col justify-center ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h2 className="text-3xl font-bold">{feature.title}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{feature.description}</p>
                    <ul className="mt-6 space-y-3">
                      {feature.features.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`flex items-center justify-center rounded-lg border border-border bg-secondary/50 p-12 ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="text-center text-muted-foreground">Feature visualization</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
