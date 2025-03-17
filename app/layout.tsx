import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Script from "next/script"

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
      images: [`${process.env.NEXT_PUBLIC_APP_URL || "https://movieWoods.vercel.app"}/og_image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'Dr Trailer'
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
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-J7NNCYQ82M"
              />
              <Script id="ga-config" strategy="afterInteractive">
                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J7NNCYQ82M');
          `}
              </Script>
                 <Script id="ad-script-1" strategy="lazyOnload">
                {`(function(d,z,s){
              s.src='https://'+d+'/401/'+z;
              try {
                  (document.body || document.documentElement).appendChild(s);
              } catch(e) {
                  console.error('Error loading script:', e);
              }
          })('groleegni.net',9094435,document.createElement('script'))`}
              </Script>


              <Script id="ad-script-2" strategy="lazyOnload">
                {`(function(d,z,s){
              s.src='https://'+d+'/401/'+z;
              try {
                  (document.body || document.documentElement).appendChild(s);
              } catch(e) {
                  console.error('Error loading script:', e);
              }
          })('gizokraijaw.net',9094436,document.createElement('script'))`}
              </Script>


              <Script id="ad-script-3" strategy="lazyOnload">
                {`(function(d,z,s){
              s.src='https://'+d+'/400/'+z;
              try {
                  (document.body || document.documentElement).appendChild(s);
              } catch(e) {
                  console.error('Error loading script:', e);
              }
          })('vemtoutcheeg.com',9094424,document.createElement('script'))`}
              </Script>
      
                            {/* Clicky Analytics Scripts */}
              <Script async data-id="101480616" src="//static.getclicky.com/js"></Script>
              <Script async data-id="101480616" src="/ee228c9c195641a1.js"></Script>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'