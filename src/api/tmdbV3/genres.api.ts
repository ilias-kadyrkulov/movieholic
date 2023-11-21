import { tmdbV3API } from './tmdb.api'

const tmdbGenresAPI = tmdbV3API.injectEndpoints({
    endpoints: (builder) => ({
        getMovieGenres: builder.query<{genres: {id: number, name: string}[]}, void>({
            query: () => 'genre/movie/list'
        })
    })
})

export const { useGetMovieGenresQuery } = tmdbGenresAPI
