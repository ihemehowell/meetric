// components/stats-section.tsx

const stats = [
  {
    value: "<10s",
    label: "Processing time",
  },
  {
    value: "98%",
    label: "Action extraction accuracy",
  },
  {
    value: "24/7",
    label: "AI meeting processing",
  },
  {
    value: "Unlimited",
    label: "Transcript support",
  },
]

export default function StatsSection() {
  return (
    <section className="py-10">
      <div className="container">
        <div className="grid gap-5 rounded-3xl border bg-card/50 p-8 backdrop-blur md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border bg-background/70 p-6"
            >
              <div className="text-4xl font-semibold tracking-tight">
                {stat.value}
              </div>

              <p className="mt-2 text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}