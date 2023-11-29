import { MovieType, ResponseType, TVType } from '../../types/types'
import { tmdbV3API } from './tmdb.api'

const tmdbAccountId = 20616061

type WFRequestType = {
  language?: string
  page?: string
  sort_by?: string
  session_id: string | undefined
}

type GetMovieResponseType = ResponseType<MovieType[]>
type GetTVResponseType = ResponseType<TVType[]>

type AddToRequestType = {
  mediaId: number | undefined
  boolean: boolean
  session_id: string | undefined
}
type AddToResponseType = {
  status_code: number
  status_message: string
}

const tmdbAccountAPI = tmdbV3API.injectEndpoints({
  endpoints: (builder) => ({
    getMoviesWatchlist: builder.query<GetMovieResponseType, WFRequestType>({
      query: ({ language = 'en-KG', page = '1', sort_by = 'created_at.asc', session_id }) => ({
        url: `account/${tmdbAccountId}/watchlist/movies?language=${language}&page=${page}&sort_by=${sort_by}`,
        params: { session_id: session_id },
      }),
      providesTags: ['MovieWatchlist'],
    }),
    getTVWatchlist: builder.query<GetTVResponseType, WFRequestType>({
      query: ({ language = 'en-KG', page = '1', sort_by = 'created_at.asc', session_id }) => ({
        url: `account/${tmdbAccountId}/watchlist/tv?language=${language}&page=${page}&sort_by=${sort_by}`,
        params: { session_id: session_id },
      }),
      providesTags: ['TVWatchlist'],
    }),
    movieWatchlist: builder.mutation<AddToResponseType, AddToRequestType>({
      query: ({ mediaId, boolean, session_id }) => ({
        url: `account/${tmdbAccountId}/watchlist`,
        method: 'POST',
        params: { session_id: session_id },
        body: {
          media_type: 'movie',
          media_id: mediaId,
          watchlist: boolean,
        },
      }),
      invalidatesTags: ['MovieWatchlist'],
    }),
    tvWatchlist: builder.mutation<AddToResponseType, AddToRequestType>({
      query: ({ mediaId, boolean, session_id }) => ({
        url: `account/${tmdbAccountId}/watchlist`,
        method: 'POST',
        params: { session_id: session_id },
        body: {
          media_type: 'tv',
          media_id: mediaId,
          watchlist: boolean,
        },
      }),
      invalidatesTags: ['TVWatchlist'],
    }),
    getMoviesFavorite: builder.query<GetMovieResponseType, WFRequestType>({
      query: ({ language = 'en-KG', page = '1', sort_by = 'created_at.asc', session_id }) => ({
        url: `account/${tmdbAccountId}/favorite/movies?language=${language}&page=${page}&sort_by=${sort_by}`,
        params: { session_id: session_id },
      }),
      providesTags: ['MovieFavorite'],
    }),
    getTVFavorite: builder.query<GetTVResponseType, WFRequestType>({
      query: ({ language = 'en-KG', page = '1', sort_by = 'created_at.asc', session_id }) => ({
        url: `account/${tmdbAccountId}/favorite/tv?language=${language}&page=${page}&sort_by=${sort_by}`,
        params: { session_id: session_id },
      }),
      providesTags: ['TVFavorite'],
    }),
    movieFavorite: builder.mutation<AddToResponseType, AddToRequestType>({
      query: ({ mediaId, boolean, session_id }) => ({
        url: `account/${tmdbAccountId}/favorite`,
        method: 'POST',
        params: { session_id: session_id },
        body: {
          media_type: 'movie',
          media_id: mediaId,
          favorite: boolean,
        },
      }),
      invalidatesTags: ['MovieFavorite'],
    }),
    tvFavorite: builder.mutation<AddToResponseType, AddToRequestType>({
      query: ({ mediaId, boolean, session_id }) => ({
        url: `account/${tmdbAccountId}/favorite`,
        method: 'POST',
        params: { session_id: session_id },
        body: {
          media_type: 'tv',
          media_id: mediaId,
          favorite: boolean,
        },
      }),
      invalidatesTags: ['TVFavorite'],
    }),
  }),
})

export const {
  useGetMoviesWatchlistQuery,
  useGetTVWatchlistQuery,
  useMovieWatchlistMutation,
  useTvWatchlistMutation,
  useGetMoviesFavoriteQuery,
  useGetTVFavoriteQuery,
  useMovieFavoriteMutation,
  useTvFavoriteMutation
} = tmdbAccountAPI
