import Link from "next/link"
import { Film } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Film className="h-6 w-6 text-primary" />
          <span className="font-bold">MovieWoods</span>
        </div>

        <nav className="flex gap-4 sm:gap-6">
          <Link href="/about" className="text-sm hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/privacy" className="text-sm hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="/contact" className="text-sm hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>

        <div className="text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MovieWoods. All rights reserved.</p>
          {/* <p className="text-xs mt-1">
            Powered by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              TMDB
            </a>
          </p> */}
        </div>
      </div>
    </footer>
  )
}

