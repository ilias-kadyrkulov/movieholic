import { MovieSearchType, PersonSearchType, ResponseType, TVSearchType } from '@/types/types'
import { tmdbV3API } from './tmdb.api'

type MultiSearchRequestType = {
  query: string
  include_adult?: boolean
  language?: string
  page?: number
}
type MovieSearchRequestType = MultiSearchRequestType & {
  region?: string
}

const tmdbSearchAPI = tmdbV3API.injectEndpoints({
  endpoints: (builder) => ({
    searchForMulti: builder.query<
      ResponseType<Array<TVSearchType | MovieSearchType | PersonSearchType>>,
      MultiSearchRequestType
    >({
      query: ({ query, include_adult = false, language = 'en-KG', page = 1 }) =>
        `search/multi?query=${query}&include_adult=${include_adult}&language=${language}&page=${page}`,
    }),
    searchForMovie: builder.query<ResponseType<MovieSearchType[]>, MovieSearchRequestType>({
      query: ({ query, include_adult = false, language = 'en-KG', page = 1, region = 'KG' }) =>
        `search/movie?query=${query}&include_adult=${include_adult}&region=${region}&language=${language}&page=${page}`,
    }),
    searchForTV: builder.query<ResponseType<TVSearchType[]>, MovieSearchRequestType>({
      query: ({ query, include_adult = false, language = 'en-KG', page = 1, region = 'KG' }) =>
        `search/tv?query=${query}&include_adult=${include_adult}&region=${region}&language=${language}&page=${page}`,
    }),
    searchForPerson: builder.query<
      ResponseType<PersonSearchType[]>,
      MultiSearchRequestType
    >({
      query: ({ query, include_adult = false, language = 'en-KG', page = 1 }) =>
        `search/person?query=${query}&include_adult=${include_adult}&language=${language}&page=${page}`,
    }),
  }),
})

export const {
  useLazySearchForMultiQuery,
  useLazySearchForMovieQuery,
  useLazySearchForTVQuery,
  useLazySearchForPersonQuery,
} = tmdbSearchAPI
