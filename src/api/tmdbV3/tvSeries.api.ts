import { tmdbV3API } from './tmdb.api'
import { ResponseType, TVDetailsResponseType } from '@/types/api.types'
import { TVSeriesDetailsRequestType } from '@/types/details.types'
import { TVType } from '@/types/tv.types'
import { CastType } from '@/types/cast.types'

type GetCastDetailsType = {
  id: number
  cast: CastType[]
}

const tmdbTVSeriesAPI = tmdbV3API.injectEndpoints({
  endpoints: (builder) => ({
    getTVSeriesDetailsByMovieId: builder.query<TVDetailsResponseType, TVSeriesDetailsRequestType>({
      query: ({ tvSeriesId, language = 'en-KG' }) => `tv/${tvSeriesId}?language=${language}`,
    }),
    getCastDetailsByTVSeriesId: builder.query<GetCastDetailsType, TVSeriesDetailsRequestType>({
      query: ({ tvSeriesId, language = 'en-KG' }) => `tv/${tvSeriesId}/credits?language=${language}`,
    }),
    getLatestReleasedTVSeries: builder.query<ResponseType<TVType[]>, string>({
      query: (date) => ({
        url: `discover/tv`,
        params: {
          include_adult: 'false',
          language: 'en-KG',
          page: '1',
          'first_air_date.lte': date,
          sort_by: 'popularity.desc',
        },
      }),
    }),
  }),
})

export const {
  useGetTVSeriesDetailsByMovieIdQuery,
  useLazyGetTVSeriesDetailsByMovieIdQuery,
  useGetCastDetailsByTVSeriesIdQuery,
  useGetLatestReleasedTVSeriesQuery,
} = tmdbTVSeriesAPI
