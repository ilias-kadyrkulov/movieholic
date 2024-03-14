import { MovieType } from "./movie.types"
import { TVType } from "./tv.types"

export type ResponseType<R> = {
    page: number
    results: R
    total_pages: number
    total_results: number
}
export type MovieDetailsResponseType = Omit<MovieType, 'genre_ids'> & {
    genres: GenresType[]
}
export type GenresType = {
    id: number
    name: string
}
export type TVDetailsResponseType = Omit<TVType, 'genre_ids'> & {
    genres: GenresType[]
    episode_run_time: number[]
    number_of_episodes: number
    number_of_seasons: number
    seasons: SeasonType[]
}
type SeasonType = {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
    vote_average: number
}
