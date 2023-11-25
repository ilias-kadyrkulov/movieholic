import { tmdbV3API } from './tmdb.api'

const tmdbAccountId = 20616061

type WFRequestType = {
  language?: string
  page?: string
  sort_by?: string
  session_id: string | undefined
}
type WFResponseType<R> = {
  page: number
  results: R
  total_pages: number
  total_results: number
}
type GetMovieResponseType = WFResponseType<MovieType[]>
type GetTVResponseType = WFResponseType<TVType[]>
type WatchlistShowType = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}
export type MovieType = WatchlistShowType & {
  original_title: string
  release_date: string
  title: string
}
export type TVType = WatchlistShowType & {
  original_name: string
  first_air_date: string
  name: string
}

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
      query: ({ language = 'en-US', page = '1', sort_by = 'created_at.asc', session_id }) => ({
        url: `account/${tmdbAccountId}/watchlist/movies?language=${language}&page=${page}&sort_by=${sort_by}`,
        params: { session_id: session_id },
      }),
      providesTags: ['MovieWatchlist'],
    }),
    getTVWatchlist: builder.query<GetTVResponseType, WFRequestType>({
      query: ({ language = 'en-US', page = '1', sort_by = 'created_at.asc', session_id }) => ({
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
      query: ({ language = 'en-US', page = '1', sort_by = 'created_at.asc', session_id }) => ({
        url: `account/${tmdbAccountId}/favorite/movies?language=${language}&page=${page}&sort_by=${sort_by}`,
        params: { session_id: session_id },
      }),
      providesTags: ['MovieFavorite'],
    }),
    getTVFavorite: builder.query<GetTVResponseType, WFRequestType>({
      query: ({ language = 'en-US', page = '1', sort_by = 'created_at.asc', session_id }) => ({
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