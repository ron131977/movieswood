declare module "*/data.json" {
  interface MovieItem {
    id: string
    videoUrl: string
  }

  interface TvItem {
    id: string
    season1?: string
    season2?: string
    season3?: string
    season4?: string
    season5?: string
    [key: string]: string | undefined
  }

  interface AdultItem {
    id: string
    slug: string
    title: string
    description: string
    thumbnailUrl: string
    videoUrl: string
    videoUrl1: string
    videoUrl2: string
    duration: number
    views: number
    category: string
    releaseDate: string
    director: string
  }

  interface DataJson {
    movie: MovieItem[]
    tv: TvItem[]
    adult: AdultItem[]
  }

  const data: DataJson
  export default data
}

