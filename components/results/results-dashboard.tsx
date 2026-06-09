"use client"

import { useState } from "react"
import { Users, Sparkles, FileText, RotateCcw } from "lucide-react"
import type { MeetingAnalysis } from "@/types/analysis"
import ActionItems from "@/components/results/action-items"
import FollowUpChat from "@/components/results/follow-up-chat"
import ExportButton from "@/components/results/export-button"
import Link from "next/link"

interface Props {
  analysis: MeetingAnalysis
}

export default function ResultsDashboard({ analysis: initial }: Props) {
  const [analysis, setAnalysis] = useState(initial)

  const {
    title, summary, processingTime,
    decisions, participants, transcript,
  } = analysis

  return (
    <div className="container relative pb-20 pt-8">

      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2 text-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Analysis Complete
          </div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            AI-generated summary, action items, participants, and decisions powered by Qwen AI.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl border bg-card/60 px-5 py-3 backdrop-blur">
            <p className="text-sm text-muted-foreground">Processing Time</p>
            <p className="mt-1 text-lg font-semibold">{processingTime}s</p>
          </div>
          <div className="rounded-2xl border bg-card/60 px-5 py-3 backdrop-blur">
            <p className="text-sm text-muted-foreground">Tasks Found</p>
            <p className="mt-1 text-lg font-semibold">{analysis.actionItems.length}</p>
          </div>
          <ExportButton analysis={analysis} />
          <Link
            href="/upload"
            className="flex items-center gap-2 rounded-2xl border bg-card/60 px-5 py-3 text-sm backdrop-blur hover:bg-card transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            New Meeting
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-12 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">

        {/* Left */}
        <div className="space-y-6">

          {/* Summary */}
          <div className="rounded-3xl border bg-card/70 p-7 backdrop-blur">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Meeting Summary</h2>
            </div>
            <p className="mt-5 leading-8 text-muted-foreground">{summary}</p>
          </div>

          {/* Editable Action Items */}
          <ActionItems
            initial={analysis.actionItems}
            onChange={(items) => setAnalysis((a) => ({ ...a, actionItems: items }))}
          />

          {/* Follow-up Chat */}
          <FollowUpChat analysis={analysis} />

          {/* Transcript */}
          <div className="rounded-3xl border bg-card/70 p-7 backdrop-blur">
            <h2 className="text-xl font-semibold">Transcript</h2>
            <div className="mt-5 max-h-75 overflow-y-auto rounded-2xl border bg-background/60 p-5 text-sm leading-7 text-muted-foreground whitespace-pre-wrap">
              {transcript}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">

          {/* Decisions */}
          <div className="rounded-3xl border bg-card/70 p-7 backdrop-blur">
            <h2 className="text-xl font-semibold">Key Decisions</h2>
            <div className="mt-6 space-y-4">
              {decisions.length === 0 ? (
                <p className="text-sm text-muted-foreground">No decisions recorded.</p>
              ) : (
                decisions.map((d, i) => (
                  <div key={i} className="rounded-2xl bg-primary/5 p-4">{d}</div>
                ))
              )}
            </div>
          </div>

          {/* Participants */}
          <div className="rounded-3xl border bg-card/70 p-7 backdrop-blur">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Participants</h2>
            </div>
            <div className="mt-6 space-y-5">
              {participants.length === 0 ? (
                <p className="text-sm text-muted-foreground">No participants detected.</p>
              ) : (
                participants.map((p) => (
                  <div key={p.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.role}</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}