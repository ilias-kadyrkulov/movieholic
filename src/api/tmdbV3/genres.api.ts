import { tmdbV3API } from './tmdb.api'

export type MovieGenreType = {
  genres: GenreType[]
}

type GenreType = {
  id: number
  name: string
}

const tmdbGenresAPI = tmdbV3API.injectEndpoints({
  endpoints: (builder) => ({
    getMovieGenres: builder.query<MovieGenreType, void>({
      query: () => 'genre/movie/list',
    }),
  }),
})

export const { useGetMovieGenresQuery } = tmdbGenresAPI
