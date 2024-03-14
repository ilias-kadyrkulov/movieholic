export type MovieDetailsRequestType = {
    movieId: number | undefined
    language?: string
}
export type TVSeriesDetailsRequestType = {
    tvSeriesId: number | undefined
    language?: string
}
export type TVSeasonsDetailsRequestType = TVSeriesDetailsRequestType & {
    season_number: number
}
export type TVSeasonsDetailsResponseType = {
    _id: string
    air_date: string
    episodes: EpisodesType[]
    name: string
    overview: string
    id: number
    poster_path: string
    season_number: number
    vote_average: number
}

export type EpisodesType = {
    air_date: string
    episode_number: number
    episode_type: string
    id: number
    name: string
    overview: string
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
    vote_average: number
    vote_count: number
}
