
"use client"

import {
  BrainCircuit,
  CheckSquare,
  Users,
  Clock3,
 FileText,
  Sparkles,
} from "lucide-react"

import { motion } from "framer-motion"

const features = [
  {
    icon: BrainCircuit,
    title: "AI Meeting Understanding",
    description:
      "Minutely understands context, decisions, and implicit commitments from long conversations.",
  },
  {
    icon: CheckSquare,
    title: "Smart Action Extraction",
    description:
      "Automatically extract tasks, owners, deadlines, and priorities without manual notes.",
  },
  {
    icon: Users,
    title: "Participant Detection",
    description:
      "Identify meeting participants and understand their roles from transcript context.",
  },
  {
    icon: Clock3,
    title: "10-Second Processing",
    description:
      "Generate structured outputs instantly using Qwen-powered reasoning pipelines.",
  },
  {
    icon: FileText,
    title: "Structured Summaries",
    description:
      "Convert messy conversations into concise, shareable meeting summaries.",
  },
  {
    icon: Sparkles,
    title: "Live Task Board",
    description:
      "Track AI-generated action items in a collaborative real-time workspace.",
  },
]

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden py-32"
    >

      {/* Background Glow */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-100 w-100 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-75 w-75 rounded-full bg-primary/5 blur-[100px]" />
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
            Powered by Qwen AI
          </div>

          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Built for modern teams
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Everything you need to transform meetings into
            structured execution and actionable workflows.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-7 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-primary/10"
            >

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
              </div>

              {/* Icon */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Glow Line */}
              <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}