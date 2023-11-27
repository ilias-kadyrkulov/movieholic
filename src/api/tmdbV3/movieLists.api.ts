import { tmdbV3API } from './tmdb.api'

export type GetNowPlayingMoviesType = {
    dates?: {
        maximum: string
        minimum: string
    }
    page: number
    results: MovieType[]
    total_pages: number
    total_results: number
}

type MovieType = {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    vote_average: number
    vote_count: number
}

const tmdbMovieListsAPI = tmdbV3API.injectEndpoints({
    endpoints: (builder) => ({
        getNowPlayingMovies: builder.query<
            GetNowPlayingMoviesType,
            { language?: string; page?: number }
        >({
            query: ({ language = 'en-KG', page = 1}) =>
                `movie/now_playing?language=${language}&page=${page}`
        })
    })
})

export const { useGetNowPlayingMoviesQuery } = tmdbMovieListsAPI
