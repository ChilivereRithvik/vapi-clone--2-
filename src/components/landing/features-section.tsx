import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Globe, Shield, Code } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "From localhost to https, in seconds.",
      description: "Deploy from Git or your CLI. Instant rollbacks and automatic HTTPS.",
    },
    {
      icon: Globe,
      title: "Deploy once, deliver everywhere.",
      description: "When you push code to Vercel, we make it instantly available across the globe.",
    },
    {
      icon: Code,
      title: "Route-aware observability.",
      description: "Monitor and analyze the performance and traffic of your projects.",
    },
    {
      icon: Shield,
      title: "Secure by default.",
      description: "Protect your workloads from DDoS and bots with automatic security features.",
    },
  ]

  return (
    <section className="container py-24">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card key={index} className="border-border bg-card">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <feature.icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
