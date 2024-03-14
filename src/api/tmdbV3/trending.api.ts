import { tmdbV3API } from './tmdb.api'
import { MovieType } from '@/types/movie.types'

type GetTrendingMoviesType = {
  page: number
  results: MovieType[]
  total_pages: number
  total_results: number
}

type TrendingMoviesRequestType = {
  language?: string
  time_window: string
}

const tmdbTrendingAPI = tmdbV3API.injectEndpoints({
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<GetTrendingMoviesType, TrendingMoviesRequestType>({
      query: ({ language = 'en-KG', time_window }) => ({
        url: `trending/movie/${time_window}`,
        params: {
          language: language,
        },
      }),
    }),
  }),
})

export const { useGetTrendingMoviesQuery } = tmdbTrendingAPI
