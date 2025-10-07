const testimonials = [
  {
    quote: "VoiceAI helped us deploy our customer service voice agent in just 2 weeks. The quality is incredible.",
    author: "Sarah Chen",
    role: "CTO at TechStart",
    company: "TechStart",
  },
  {
    quote:
      "The analytics dashboard gives us insights we never had before. We've improved our call completion rate by 40%.",
    author: "Michael Rodriguez",
    role: "Product Lead at BuildFast",
    company: "BuildFast",
  },
  {
    quote: "Best voice AI platform we've used. The latency is unmatched and the developer experience is fantastic.",
    author: "Emily Watson",
    role: "Engineering Manager at CloudScale",
    company: "CloudScale",
  },
]

export function Testimonials() {
  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by developers and businesses</h2>
          <p className="mt-4 text-lg text-muted-foreground">See what our customers are saying</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="rounded-lg border border-border bg-card p-6">
              <p className="text-muted-foreground leading-relaxed">"{testimonial.quote}"</p>
              <div className="mt-6">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
