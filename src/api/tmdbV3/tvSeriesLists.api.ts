import { tmdbV3API } from './tmdb.api'

type GetListAiringTodayType = {
    page: number
    results: TVSeriesType[]
    total_pages: number
    total_results: number
}

type TVSeriesType = {
    first_air_date: string
    genre_ids: number[]
    id: number
    name: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
}

const tmdbTvSeriesListsAPI = tmdbV3API.injectEndpoints({
    endpoints: (builder) => ({
        getListAiringToday: builder.query<GetListAiringTodayType, void>({
            query: () => 'tv/airing_today'
        })
    })
})

export const {} = tmdbTvSeriesListsAPI