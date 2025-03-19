// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import Script from "next/script"
// import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: {
//     default: `${SITE_NAME} - Stream Movies and TV Shows`,
//     template: `%s | ${SITE_NAME}`,
//   },
//   description: `Stream your favorite movies and TV shows on ${SITE_NAME}. Search for content and enjoy high-quality streaming.`,
//   keywords: ["movies", "tv shows", "streaming", "watch online", "film", "series"],
//   authors: [{ name: SITE_NAME }],
//   creator: SITE_NAME,
//   publisher: SITE_NAME,
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: SITE_URL,
//     title: `${SITE_NAME} - Stream Movies and TV Shows`,
//     description: `Stream your favorite movies and TV shows on ${SITE_NAME}. Search for content and enjoy high-quality streaming.`,
//     siteName: SITE_NAME,
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: `${SITE_NAME} - Stream Movies and TV Shows`,
//     description: `Stream your favorite movies and TV shows on ${SITE_NAME}. Search for content and enjoy high-quality streaming.`,
//   },
//   robots: {
//     index: true,
//     follow: true,
//   },
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
//           <div className="flex min-h-screen flex-col">
//             <Header />
//             <main className="flex-1">{children}</main>
//             <Footer />
//             <Script
//                 id="google-analytics"
//                 strategy="afterInteractive"
//                 src="https://www.googletagmanager.com/gtag/js?id=G-J7NNCYQ82M"
//               />
//               <Script id="ga-config" strategy="afterInteractive">
//                 {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-J7NNCYQ82M');
//           `}
//               </Script>
//                  <Script id="ad-script-1" strategy="lazyOnload">
//                 {`(function(d,z,s){
//               s.src='https://'+d+'/401/'+z;
//               try {
//                   (document.body || document.documentElement).appendChild(s);
//               } catch(e) {
//                   console.error('Error loading script:', e);
//               }
//           })('groleegni.net',9094435,document.createElement('script'))`}
//               </Script>


//               <Script id="ad-script-2" strategy="lazyOnload">
//                 {`(function(d,z,s){
//               s.src='https://'+d+'/401/'+z;
//               try {
//                   (document.body || document.documentElement).appendChild(s);
//               } catch(e) {
//                   console.error('Error loading script:', e);
//               }
//           })('gizokraijaw.net',9094436,document.createElement('script'))`}
//               </Script>


//               <Script id="ad-script-3" strategy="lazyOnload">
//                 {`(function(d,z,s){
//               s.src='https://'+d+'/400/'+z;
//               try {
//                   (document.body || document.documentElement).appendChild(s);
//               } catch(e) {
//                   console.error('Error loading script:', e);
//               }
//           })('vemtoutcheeg.com',9094424,document.createElement('script'))`}
//               </Script>
      
//                             {/* Clicky Analytics Scripts */}
//               <Script async data-id="101480616" src="//static.getclicky.com/js"></Script>
//               <Script async data-id="101480616" src="/ee228c9c195641a1.js"></Script>
//           </div>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Stream Movies and TV Shows`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `Stream your favorite movies and TV shows on ${SITE_NAME}. Search for content and enjoy high-quality streaming.`,
  keywords: ["movies", "tv shows", "streaming", "watch online", "film", "series"],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: `${SITE_NAME} - Stream Movies and TV Shows`,
    description: `Stream your favorite movies and TV shows on ${SITE_NAME}. Search for content and enjoy high-quality streaming.`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Stream Movies and TV Shows`,
    description: `Stream your favorite movies and TV shows on ${SITE_NAME}. Search for content and enjoy high-quality streaming.`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to TMDB API and image domains */}
        <link rel="preconnect" href="https://api.themoviedb.org" />
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://api.themoviedb.org" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
      </head>
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

