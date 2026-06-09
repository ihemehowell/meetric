// components/footer.tsx

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        
        <div>
          <h3 className="text-lg font-semibold">
            Minutely
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            AI-powered meeting intelligence.
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="#">
            Features
          </Link>

          <Link href="#">
            Pricing
          </Link>

          <Link href="#">
            Docs
          </Link>

          <Link href="#">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}