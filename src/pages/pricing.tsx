"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const plans = [
  {
    name: "Starter",
    description: "Perfect for testing and small projects",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "100 minutes/month included",
      "Basic voice agents",
      "Standard latency",
      "Community support",
      "Basic analytics",
      "API access",
    ],
    cta: "Start for free",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For growing businesses and production apps",
    monthlyPrice: 99,
    yearlyPrice: 950,
    features: [
      "1,000 minutes/month included",
      "Advanced voice agents",
      "Voice squads",
      "Low latency (< 500ms)",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
      "Webhook support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale deployments",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      "Custom minutes",
      "Dedicated infrastructure",
      "SLA guarantees",
      "24/7 phone support",
      "Custom models",
      "On-premise deployment",
      "Advanced security",
      "Custom contracts",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
]

const faqs = [
  {
    question: "How does pricing work?",
    answer:
      "We charge based on the number of minutes used. Each plan includes a base amount of minutes, and you can purchase additional minutes as needed. All plans include access to our core features.",
  },
  {
    question: "What counts as a minute?",
    answer:
      "A minute is calculated as the total duration of a voice call, including both the AI speaking and listening time. Partial minutes are rounded up to the nearest second.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges or credits.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes! The Starter plan is free forever with 100 minutes per month. Pro and Enterprise plans come with a 14-day free trial with no credit card required.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) and can arrange invoicing for Enterprise customers.",
  },
  {
    question: "Is there a setup fee?",
    answer: "No, there are no setup fees or hidden costs. You only pay for what you use based on your selected plan.",
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl">Simple, transparent pricing</h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>

            <div className="mt-10 inline-flex items-center rounded-lg border border-border bg-secondary p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                  billingCycle === "monthly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                  billingCycle === "yearly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Yearly
                <span className="ml-2 text-xs text-accent">Save 20%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-lg border p-8 ${
                  plan.highlighted ? "border-accent bg-accent/5 shadow-lg shadow-accent/10" : "border-border bg-card"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-accent px-4 py-1 text-xs font-semibold text-background">
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

                  <div className="mt-6">
                    {plan.monthlyPrice === null ? (
                      <div className="text-4xl font-bold">Custom</div>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold">
                            ${billingCycle === "monthly" ? plan.monthlyPrice : Math.floor(plan.yearlyPrice / 12)}
                          </span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        {billingCycle === "yearly" && plan.yearlyPrice > 0 && (
                          <p className="mt-1 text-sm text-muted-foreground">Billed ${plan.yearlyPrice} annually</p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <Button className="mt-8 w-full" variant={plan.highlighted ? "default" : "outline"}>
                  {plan.cta}
                </Button>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Frequently asked questions</h2>
            <p className="mt-4 text-lg text-muted-foreground">Everything you need to know about pricing</p>
          </div>

          <Accordion type="single" collapsible className="mt-12">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  )
}
