import { MovieType } from '../../types/types'
import { tmdbV3API } from './tmdb.api'

type GetTrendingMoviesType = {
  page: number
  results: MovieType[]
  total_pages: number
  total_results: number
}



const tmdbTrendingAPI = tmdbV3API.injectEndpoints({
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<
      GetTrendingMoviesType,
      { language?: string; time_window: string }
    >({
      query: ({ language = 'en-KG', time_window }) =>
        `trending/movie/${time_window}?language=${language}`,
    }),
  }),
})

export const { useGetTrendingMoviesQuery } = tmdbTrendingAPI
