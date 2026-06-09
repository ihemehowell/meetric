"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { BrainCircuit, CheckCircle2, Clock3, Sparkles, Users } from "lucide-react"
import type { MeetingAnalysis } from "@/types/analysis"

const steps = [
  {
    icon: BrainCircuit,
    title: "Analyzing transcript context",
    description: "Qwen AI is understanding the meeting discussion",
  },
  {
    icon: Users,
    title: "Identifying participants",
    description: "Detecting speakers and responsibilities",
  },
  {
    icon: CheckCircle2,
    title: "Extracting action items",
    description: "Finding commitments, tasks, and deadlines",
  },
  {
    icon: Clock3,
    title: "Generating structured output",
    description: "Creating summaries and action boards",
  },
]

interface Props {
  transcript: string
  onComplete: (data: MeetingAnalysis) => void
}

export default function ProcessingScreen({ transcript, onComplete }: Props) {
  const hasFired = useRef(false)

  useEffect(() => {
    if (hasFired.current) return
    hasFired.current = true

    const start = Date.now()

    async function analyze() {
      try {
        const res = await fetch("/api/analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transcript }),
        })

      if (!res.ok) {
      const detail = await res.json()
      console.error("API route failed:", detail)
      throw new Error("API route failed")
    }

        const data: MeetingAnalysis = await res.json()
        onComplete(data)
      } catch (err) {
        console.error("Processing error:", err)
        onComplete(getFallback(transcript, Date.now() - start))
      }
    }

    analyze()
  }, [transcript, onComplete])

  return (
    <div className="relative overflow-hidden rounded-[2rem] border bg-card/70 p-8 shadow-2xl backdrop-blur-xl">
      <div className="absolute inset-0 -z-10 bg-primary/5 blur-3xl" />

      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Processing Meeting</h2>
          <p className="text-muted-foreground">Powered by Qwen AI</p>
        </div>
      </div>

      <div className="mt-10 space-y-5">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.4, duration: 0.5 }}
            className="flex items-start gap-4 rounded-2xl border bg-background/60 p-5 backdrop-blur"
          >
            <div className="relative mt-1">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-medium">{step.title}</h3>
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.4s]" />
                </div>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border bg-background/60 p-5 text-sm text-muted-foreground">
        Minutely is extracting summaries, action items, decisions, priorities,
        and participant insights in real-time.
      </div>
    </div>
  )
}

function getFallback(transcript: string, elapsed: number): MeetingAnalysis {
  return {
    title: "Meeting Analysis",
    summary: "Could not reach Qwen AI. Check your API key or network connection.",
    processingTime: parseFloat((elapsed / 1000).toFixed(1)),
    actionItems: [],
    decisions: [],
    participants: [],
    transcript,
  }
}