import { tmdbV3API } from './tmdb.api'
import { GenresType } from '@/types/api.types'

type GenresResponseType = {
    genres: GenresType[]
}

const tmdbGenresAPI = tmdbV3API.injectEndpoints({
    endpoints: builder => ({
        getMovieGenres: builder.query<GenresResponseType, void>({
            query: () => 'genre/movie/list'
        }),
        getTVGenres: builder.query<GenresResponseType, void>({
            query: () => 'genre/tv/list'
        })
    })
})

export const { useGetMovieGenresQuery, useGetTVGenresQuery } = tmdbGenresAPI
