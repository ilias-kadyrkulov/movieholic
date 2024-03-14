import { tmdbV3API } from './tmdb.api'
import { MovieDetailsResponseType, ResponseType } from '@/types/api.types'
import { MovieDetailsRequestType } from '@/types/details.types'
import { MovieType } from '@/types/movie.types'
import { CastType } from '@/types/cast.types'

type GetCastDetailsType = {
  id: number
  cast: CastType[]
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
