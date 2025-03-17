import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "MovieWoods - Stream Movies and TV Shows",
    template: "%s | MovieWoods",
  },
  description:
    "Stream your favorite movies and TV shows on MovieWoods. Search for content and enjoy high-quality streaming.",
  keywords: ["movies", "tv shows", "streaming", "watch online", "film", "series"],
  authors: [{ name: "MovieWoods" }],
  creator: "MovieWoods",
  publisher: "MovieWoods",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://moviewoods.vercel.app",
    title: "MovieWoods - Stream Movies and TV Shows",
    description:
      "Stream your favorite movies and TV shows on MovieWoods. Search for content and enjoy high-quality streaming.",
    siteName: "MovieWoods",
  },
  twitter: {
    card: "summary_large_image",
    title: "MovieWoods - Stream Movies and TV Shows",
    description:
      "Stream your favorite movies and TV shows on MovieWoods. Search for content and enjoy high-quality streaming.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'