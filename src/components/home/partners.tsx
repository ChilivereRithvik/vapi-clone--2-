export function Partners() {
  const partners = ["Acme Corp", "TechStart", "InnovateCo", "BuildFast", "CloudScale", "DataFlow"]

  return (
    <section className="border-b border-border py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">Trusted by builders at</p>
        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div key={partner} className="flex items-center justify-center">
              <span className="text-lg font-semibold text-muted-foreground/60">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
