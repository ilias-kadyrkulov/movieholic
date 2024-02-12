import { MovieDetailsRequestType, MovieDetailsResponseType, MovieType, ResponseType } from '@/types/types'
import { tmdbV3API } from './tmdb.api'

type GetCastDetailsType = {
  id: number
  cast: CastType[]
}

type CastType = {
  id: number
  name: string
  profile_path: string
  character: string
}



const tmdbMoviesAPI = tmdbV3API.injectEndpoints({
  endpoints: (builder) => ({
    getMovieDetailsByMovieId: builder.query<MovieDetailsResponseType, MovieDetailsRequestType>({
      query: ({ movieId, language = 'en-KG' }) => `movie/${movieId}?language=${language}`,
    }),
    getCastDetailsByMovieId: builder.query<GetCastDetailsType, MovieDetailsRequestType>({
      query: ({ movieId, language = 'en-KG' }) => `movie/${movieId}/credits?language=${language}`,
    }),
    getLatestReleasedMovies: builder.query<ResponseType<MovieType[]>, string>({
      query: (date) => ({
        url: `discover/movie`,
        params: {
          include_adult: 'false',
          include_video: 'false',
          language: 'en-KG',
          page: '1',
          region: 'KG',
          'release_date.gte': '2023-10-01',
          'release_date.lte': date,
          sort_by: 'popularity.asc'
        },
      }),
    }),
  }),
})

export const {
  useGetMovieDetailsByMovieIdQuery,
  useLazyGetMovieDetailsByMovieIdQuery,
  useGetCastDetailsByMovieIdQuery,
  useGetLatestReleasedMoviesQuery,
} = tmdbMoviesAPI
