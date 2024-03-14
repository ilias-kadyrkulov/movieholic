import { TVSeasonsDetailsRequestType, TVSeasonsDetailsResponseType } from '@/types/details.types'
import { tmdbV3API } from './tmdb.api'

const tmdbTVSeasonsAPI = tmdbV3API.injectEndpoints({
  endpoints: (builder) => ({
    getTVSeasonsDetails: builder.query<TVSeasonsDetailsResponseType, TVSeasonsDetailsRequestType>({
      query: ({ tvSeriesId, season_number = 1, language = 'en-KG' }) =>
        `tv/${tvSeriesId}/season/${season_number}?language=${language}`,
    }),
  }),
})

export const { useGetTVSeasonsDetailsQuery, useLazyGetTVSeasonsDetailsQuery } = tmdbTVSeasonsAPI
