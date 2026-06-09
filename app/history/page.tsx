import HistoryList from "@/components/history/history-list"
import Navbar from "@/components/layout/Navbar"

import { History } from "lucide-react"

export default function HistoryPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pb-20">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <Navbar />
      <div className="container relative pt-32">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <History className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">Meeting History</h1>
            <p className="text-muted-foreground">Your previously analyzed meetings</p>
          </div>
        </div>
        <HistoryList />
      </div>
    </main>
  )
}