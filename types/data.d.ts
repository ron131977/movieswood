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

  interface NewsItem {
    id: string
    poster: string
    m3u8: string
  }

  interface TvShowItem {
    id: string
    poster: string
    php: string
  }

  interface SportsItem {
    id: string
    poster: string
    php: string
  }

  interface SportsCategory {
    [category: string]: SportsItem[]
  }

  interface DataJson {
    movie: MovieItem[]
    tv: TvItem[]
    adult: AdultItem[]
    news: NewsItem[]
    tvshow: TvShowItem[]
    sports: SportsCategory
  }

  const data: DataJson
  export default data
}

