import { tmdbV3API } from './tmdb.api'

type GetMovieDetailsType = {
    adult: boolean
    backdrop_path: string
    genres: MovieDetailsType[]
    id: number
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    runtime: number
    title: string
    vote_average: number
    vote_count: number
}

type MovieDetailsType = {
    id: number
    name: string
}

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

type RequestType = {
    movieId: number
    language?: string
}

const tmdbMoviesAPI = tmdbV3API.injectEndpoints({
    endpoints: (builder) => ({
        getMovieDetailsByMovieId: builder.query<
            GetMovieDetailsType,
            RequestType
        >({
            query: ({movieId, language = 'en-US'}) =>
                `movie/${movieId}?language=${language}&`
        }),
        getCastDetailsByMovieId: builder.query<GetCastDetailsType, RequestType>({
            query: ({movieId, language = 'en-US'}) =>
                `movie/${movieId}/credits?language=${language}`
        })
    })
})

export const { useGetMovieDetailsByMovieIdQuery, useGetCastDetailsByMovieIdQuery } = tmdbMoviesAPI
