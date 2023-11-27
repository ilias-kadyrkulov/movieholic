export type MovieType = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  runtime: string
  title: string
  vote_average: number
  vote_count: number
}
export type MovieDetailsType = Omit<MovieType, 'genre_ids'> & {
  genres: MovieGenresType[]
}
export type TVType = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  overview: string
  original_name: string
  first_air_date: string
  name: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}

type MovieGenresType = {
  id: number
  name: string
}