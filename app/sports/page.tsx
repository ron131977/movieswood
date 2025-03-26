import type { Metadata } from "next"
import Link from "next/link"
import { getAllSportsCategories, getSportsByCategory } from "@/lib/live-broadcast"
import SportsCard from "@/components/sports-card"
import GmtTime from "@/components/gmt-time"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

export const metadata: Metadata = {
  title: `Live Sports | ${SITE_NAME}`,
  description: `Watch live sports on ${SITE_NAME}.`,
  openGraph: {
    title: `Live Sports | ${SITE_NAME}`,
    description: `Watch live sports on ${SITE_NAME}.`,
    url: `${SITE_URL}/sports`,
    siteName: SITE_NAME,
    type: "website",
  },
}

export default function SportsPage() {
  const categories = getAllSportsCategories()

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Live Sports</h1>
        <GmtTime />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Categories sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Sports Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <Link href={`#${category}`} className="flex items-center gap-2 text-sm hover:text-primary">
                      <Activity className="h-4 w-4" />
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sports content */}
        <div className="space-y-8">
          {categories.map((category) => {
            const sports = getSportsByCategory(category)
            return (
              <div key={category} id={category}>
                <h2 className="text-2xl font-bold mb-4">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sports.map((item) => (
                    <SportsCard key={item.id} sports={item} category={category} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

