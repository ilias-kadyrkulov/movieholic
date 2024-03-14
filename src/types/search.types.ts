import { MovieType } from './movie.types'
import { TVType } from './tv.types'

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
