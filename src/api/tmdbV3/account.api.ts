import { tmdbV3API } from './tmdb.api'

const tmdbAccountId = 20616061

type WatchlistRequestType = {
    language?: string
    page?: string
    sort_by?: string
    session_id: string | undefined
}
type WatchlistResponseType<R> = {
    page: number
    results: R
    total_pages: number
    total_results: number
}
type GetWatchlistMovieResponseType = WatchlistResponseType<WatchlistMovieType[]>
type GetWatchlistTVResponseType = WatchlistResponseType<WatchlistTVType[]>
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
export type WatchlistMovieType = WatchlistShowType & {
    original_title: string
    release_date: string
    title: string
}
export type WatchlistTVType = WatchlistShowType & {
    original_name: string
    first_air_date: string
    name: string
}

type AddToWatchlistRequestType = {
    mediaType: string
    mediaId: number | undefined
    boolean: boolean
    session_id: string | undefined
}
type AddToWatchlistResponseType = {
    status_code: number
    status_message: string
}

const tmdbAccountAPI = tmdbV3API.injectEndpoints({
    endpoints: (builder) => ({
        getMoviesWatchlist: builder.query<
            GetWatchlistMovieResponseType,
            WatchlistRequestType
        >({
            query: ({
                language = 'en-US',
                page = '1',
                sort_by = 'created_at.asc',
                session_id
            }) => ({
                url: `account/${tmdbAccountId}/watchlist/movies?language=${language}&page=${page}&sort_by=${sort_by}`,
                params: { session_id: session_id }
            }),
            providesTags: ['MovieWatchlist']
        }),
        getTVWatchlist: builder.query<
            GetWatchlistTVResponseType,
            WatchlistRequestType
        >({
            query: ({
                language = 'en-US',
                page = '1',
                sort_by = 'created_at.asc',
                session_id
            }) => ({
                url: `account/${tmdbAccountId}/watchlist/tv?language=${language}&page=${page}&sort_by=${sort_by}`,
                params: { session_id: session_id }
            }),
            providesTags: ['TVWatchlist']
        }),
        movieWatchlist: builder.mutation<
            AddToWatchlistResponseType,
            AddToWatchlistRequestType
        >({
            query: ({ mediaType, mediaId, boolean, session_id }) => ({
                url: `account/${tmdbAccountId}/watchlist`,
                method: 'POST',
                params: { session_id: session_id },
                body: {
                    media_type: mediaType,
                    media_id: mediaId,
                    watchlist: boolean
                }
            }),
            invalidatesTags: ['MovieWatchlist']
        }),
        tvWatchlist: builder.mutation<
            AddToWatchlistResponseType,
            AddToWatchlistRequestType
        >({
            query: ({ mediaType, mediaId, boolean, session_id }) => ({
                url: `account/${tmdbAccountId}/watchlist`,
                method: 'POST',
                params: { session_id: session_id },
                body: {
                    media_type: mediaType,
                    media_id: mediaId,
                    watchlist: boolean
                }
            }),
            invalidatesTags: ['TVWatchlist']
        })
    })
})

export const {
    useGetMoviesWatchlistQuery,
    useGetTVWatchlistQuery,
    useMovieWatchlistMutation,
    useTvWatchlistMutation
} = tmdbAccountAPI
