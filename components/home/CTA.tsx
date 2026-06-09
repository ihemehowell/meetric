// components/cta-section.tsx

"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-32">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

        <div className="absolute bottom-0 left-1/4 h-75 w-75 rounded-full bg-primary/5 blur-[100px]" />

        <div className="absolute right-1/4 top-0 h-62.5 w-62.5 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
          className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/60 px-8 py-20 text-center shadow-2xl backdrop-blur-2xl md:px-16"
        >

          {/* Gradient Overlay */}
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-transparent to-primary/10" />

          {/* Shine */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

          {/* Floating Glow */}
          <div className="absolute left-1/2 top-1/2 -z-20 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

          <div className="mx-auto max-w-3xl">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm text-muted-foreground backdrop-blur-xl">

              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </div>

              Powered by Qwen AI
            </div>

            {/* Heading */}
            <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              Your meetings deserve

              <span className="relative block bg-linear-to-r from-primary via-emerald-300 to-primary bg-clip-text text-transparent">
                better intelligence

                {/* Text Glow */}
                <span className="absolute inset-0 -z-10 bg-primary/20 blur-3xl" />
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Stop manually writing notes, tracking decisions,
              and chasing action items. Let Minutely transform
              conversations into structured execution instantly.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <Link href="/upload">
              <Button
                size="lg"
                className="h-12 rounded-2xl px-8 text-base shadow-lg shadow-primary/20"
              >
               Upload Meeting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-2xl px-8 text-base backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-background/80"
              >
                <Sparkles className="mr-2 h-4 w-4" />

                Watch Demo
              </Button>
            </div>

            {/* Small Trust Line */}
            <div className="mt-8 text-sm text-muted-foreground">
              No credit card required • Built with Qwen AI
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}