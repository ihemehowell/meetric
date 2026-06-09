"use client"

import { useState } from "react"
import { Upload, FileText, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

const SAMPLE_TRANSCRIPT = `Sarah: Okay everyone, let's get started. We need to finalize the onboarding flow before the July 18 launch.

Michael: Engineering can deliver the API updates by Monday. Auth and user creation endpoints will be ready.

Emma: I'll have the design revisions done by Thursday. The mobile screens are almost wrapped.

Sarah: Good. We also agreed on freemium pricing — that's locked in. Michael, can you update the pricing docs?

Michael: Yes, I'll do that by Monday as well.

Sarah: Emma, you own the onboarding screens. That's high priority — can we get those by Friday?

Emma: Confirmed, Friday works.

Sarah: One more thing — mobile onboarding is the priority over desktop. Let's align on that.

Michael: Agreed. Desktop can follow in the next sprint.

Sarah: Perfect. So to recap: launch is July 18, freemium pricing approved, mobile onboarding first. Let's ship.`

interface Props {
  onAnalyze: (transcript: string) => void
}

export default function UploadZone({ onAnalyze }: Props) {
  const [transcript, setTranscript] = useState("")

  const handleAnalyze = () => {
    const text = transcript.trim()
    if (!text) return
    onAnalyze(text)
  }

  const handleSample = () => {
    setTranscript(SAMPLE_TRANSCRIPT)
  }

  return (
    <Card className="overflow-hidden border-border/60 bg-card/70 shadow-2xl backdrop-blur-xl">
      <div className="border-b bg-muted/40 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-medium">Meeting Intelligence</h2>
            <p className="text-sm text-muted-foreground">Analyze transcripts with Qwen AI</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="rounded-3xl border border-dashed bg-background/50 p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Upload className="h-7 w-7 text-primary" />
          </div>
          <h3 className="mt-5 text-xl font-medium">Upload transcript or voice note</h3>
          <p className="mt-2 text-muted-foreground">Drag and drop files or paste meeting transcript below</p>
          <Button className="mt-6 rounded-2xl">Choose File</Button>
        </div>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Paste Transcript</span>
          </div>
          <Textarea
            placeholder="Paste your meeting transcript here..."
            className="min-h-55 resize-none rounded-2xl border-border/60 bg-background/60"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={handleSample}
            className="text-sm text-primary hover:underline text-left"
          >
            Use sample transcript
          </button>

          <Button
            size="lg"
            className="rounded-2xl px-8 shadow-lg shadow-primary/20"
            onClick={handleAnalyze}
            disabled={!transcript.trim()}
          >
            Analyze with Qwen AI
          </Button>
        </div>
      </div>
    </Card>
  )
}