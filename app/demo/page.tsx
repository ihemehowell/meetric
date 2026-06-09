// app/demo/page.tsx

"use client"

import { useState } from "react"

import UploadZone from "@/components/upload/upload-zone"
import ProcessingScreen from "@/components/upload/processing-screen"
import ResultsDashboard from "@/components/results/results-dashboard"

type Step =
  | "upload"
  | "processing"
  | "results"

export default function DemoPage() {
  const [step, setStep] =
    useState<Step>("upload")

  return (
    <main className="relative min-h-screen overflow-hidden py-20">

      {/* Background */}
      <div className="bg-grid absolute inset-0 opacity-40" />

      <div className="container relative">

        {step === "upload" && (
          <UploadZone
            onAnalyze={() => {
              setStep("processing")

              setTimeout(() => {
                setStep("results")
              }, 5000)
            }}
          />
        )}

        {step === "processing" && (
          <ProcessingScreen />
        )}

        {step === "results" && (
          <ResultsDashboard />
        )}

      </div>
    </main>
  )
}