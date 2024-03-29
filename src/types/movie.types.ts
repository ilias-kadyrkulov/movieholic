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

export type NowPlayingMovieType = Omit<
    MovieType,
    | 'adult'
    | 'backdrop_path'
    | 'vote_average'
    | 'vote_count'
    | 'popularity'
    | 'original_title'
> & {
    imageSrc?: string
}
