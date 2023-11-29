export type ResponseType<R> = {
  page: number
  results: R
  total_pages: number
  total_results: number
}
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
export type NowPlayingMovieType = Omit<MovieType, 'runtime'>
export type MovieDetailsResponseType = Omit<MovieType, 'genre_ids'> & {
  genres: GenresType[]
}
export type GenresType = {
  id: number
  name: string
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
export type TVDetailsResponseType = Omit<TVType, 'genre_ids'> & {
  genres: GenresType[]
  episode_run_time: number[]
  number_of_episodes: number
  number_of_seasons: number
}

//NOTE - Search
export type MovieSearchType = Omit<MovieType, 'runtime'> &
  MovieType & {
    media_type: 'movie'
  }
export type TVSearchType = TVType & {
  media_type: 'tv'
}
export type PersonSearchType = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  media_type: 'person'
  original_name: string
  popularity: number
  profile_path: string
  known_for: MovieSearchType[] | TVSearchType[]
}

//NOTE - Details
export type MovieDetailsRequestType = {
  movieId: number | undefined
  language?: string
}
export type TVSeriesDetailsRequestType = {
  tvSeriesId: number | undefined
  language?: string
}

//NOTE - Cast
export type CastType = {
  id: number
  name: string
  profile_path: string
  character: string
}
