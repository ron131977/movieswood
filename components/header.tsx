// "use client"

// import type React from "react"

// import { useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Film, Search, Menu, X, Tv, Home, ChevronDown } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { cn } from "@/lib/utils"
// import { useMediaQuery } from "@/hooks/use-media-query"
// import { SITE_NAME } from "@/lib/tmdb"

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const router = useRouter()
//   const isMobile = useMediaQuery("(max-width: 768px)")

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
//       setSearchQuery("")
//       setIsMenuOpen(false)
//     }
//   }

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             <span className="sr-only">Toggle menu</span>
//           </Button>

//           <Link href="/" className="flex items-center gap-2">
//             <Film className="h-6 w-6 text-primary" />
//             <span className="font-bold text-xl hidden sm:inline-block">{SITE_NAME}</span>
//           </Link>
//         </div>

//         <nav
//           className={cn(
//             "absolute left-0 right-0 top-16 z-50 bg-background border-b md:static md:top-0 md:border-0 md:bg-transparent",
//             isMenuOpen ? "block" : "hidden md:block",
//           )}
//         >
//           <ul className="container flex flex-col gap-3 p-4 md:flex-row md:items-center md:p-0">
//             <li>
//               <Link
//                 href="/"
//                 className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary md:text-base"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <Home className="h-5 w-5 md:hidden" />
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/movies"
//                 className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary md:text-base"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <Film className="h-5 w-5 md:hidden" />
//                 Movies
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/tv"
//                 className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary md:text-base"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <Tv className="h-5 w-5 md:hidden" />
//                 TV Shows
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/adult"
//                 className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary md:text-base"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <Film className="h-5 w-5 md:hidden" />
//                 Adult
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/trending"
//                 className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary md:text-base"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <Tv className="h-5 w-5 md:hidden" />
//                 Trending
//               </Link>
//             </li>
//             <li className="relative group">
//               <button
//                 className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary md:text-base"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 <Tv className="h-5 w-5 md:hidden" />
//                 Live Broadcast
//                 <ChevronDown className="h-4 w-4" />
//               </button>
//               <div className="hidden group-hover:block absolute left-0 mt-2 w-48 bg-background border rounded-md shadow-lg z-50">
//                 <Link href="/news" className="block px-4 py-2 hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
//                   News
//                 </Link>
//                 <Link href="/tvshow" className="block px-4 py-2 hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
//                   TV Shows
//                 </Link>
//                 <Link href="/sports" className="block px-4 py-2 hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
//                   Sports
//                 </Link>
//               </div>
//             </li>
//           </ul>
//         </nav>

//         <div className="flex items-center gap-2">
//           <form onSubmit={handleSearch} className="hidden md:flex relative">
//             <Input
//               type="search"
//               placeholder="Search..."
//               className="w-[200px] lg:w-[300px]"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
//               <Search className="h-4 w-4" />
//               <span className="sr-only">Search</span>
//             </Button>
//           </form>

//           <Button variant="ghost" size="icon" className="md:hidden" onClick={() => router.push("/search")}>
//             <Search className="h-5 w-5" />
//             <span className="sr-only">Search</span>
//           </Button>

//           <ThemeToggle />
//         </div>
//       </div>
//     </header>
//   )
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Film, Search, Menu, X, Tv, Home, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SITE_NAME } from "@/lib/tmdb";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiveMenuOpen, setIsLiveMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>

          <Link href="/" className="flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block">{SITE_NAME}</span>
          </Link>
        </div>

        <nav
          className={cn(
            "absolute left-0 right-0 top-16 z-50 bg-background border-b md:static md:top-0 md:border-0 md:bg-transparent",
            isMenuOpen ? "block" : "hidden md:block"
          )}
        >
          <ul className="container flex flex-col gap-3 p-4 md:flex-row md:items-center md:p-0">
            <li>
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary md:text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5 md:hidden" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/movies"
                className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary md:text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                <Film className="h-5 w-5 md:hidden" />
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="/tv"
                className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary md:text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                <Tv className="h-5 w-5 md:hidden" />
                TV Shows
              </Link>
            </li>
            <li>
              <Link
                href="/adult"
                className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary md:text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                <Film className="h-5 w-5 md:hidden" />
                Adult
              </Link>
            </li>
            <li>
              <Link
                href="/trending"
                className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary md:text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                <Tv className="h-5 w-5 md:hidden" />
                Trending
              </Link>
            </li>
            {/* Live Broadcast Dropdown */}
            <li className="relative">
              <button
                className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary md:text-base"
                onClick={() => setIsLiveMenuOpen(!isLiveMenuOpen)}
              >
                <Tv className="h-5 w-5 md:hidden" />
                Live Broadcast
                <ChevronDown className={`h-4 w-4 transition-transform ${isLiveMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {isLiveMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-background border rounded-md shadow-lg z-50">
                  <Link href="/news" className="block px-4 py-2 hover:bg-muted" onClick={() => setIsLiveMenuOpen(false)}>
                    News
                  </Link>
                  <Link href="/tvshow" className="block px-4 py-2 hover:bg-muted" onClick={() => setIsLiveMenuOpen(false)}>
                    TV Shows
                  </Link>
                  <Link href="/sports" className="block px-4 py-2 hover:bg-muted" onClick={() => setIsLiveMenuOpen(false)}>
                    Sports
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => router.push("/search")}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
