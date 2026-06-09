// components/how-it-works.tsx

"use client"

import { motion } from "framer-motion"
import {
  Upload,
  BrainCircuit,
  KanbanSquare,
} from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Upload transcript",
    description:
      "Paste a transcript or upload a voice note from your meeting.",
    icon: Upload,
  },
  {
    number: "02",
    title: "AI extracts insights",
    description:
      "Minutely identifies summaries, action items, participants, and decisions.",
    icon: BrainCircuit,
  },
  {
    number: "03",
    title: "Track execution",
    description:
      "Manage AI-generated tasks inside a live collaborative workspace.",
    icon: KanbanSquare,
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="relative overflow-hidden py-32"
    >

      {/* Background Glow */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container relative">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
          }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
            Workflow
          </div>

          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            From conversation
            <span className="block text-primary">
              to execution
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Minutely transforms raw meetings into structured,
            actionable workflows powered by Qwen AI.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-24">

          {/* Connection Line */}
          <div className="absolute left-1/2 top-24 hidden h-0.5 w-[70%] -translate-x-1/2 bg-linear-to-r from-transparent via-primary/30 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-primary/10"
              >

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
                </div>

                {/* Number */}
                <div className="absolute right-6 top-6 text-6xl font-bold tracking-tight text-primary/10">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="mt-8 text-2xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}