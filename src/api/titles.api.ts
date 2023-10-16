import { api } from './api'

type ResponseType = {
    entries: number
    next: string
    page: number
    results: EntryType[]
}
type QueryParams = {
    list: string
    info: string
}

type GenreType = {
    id: string
    text: string
}
export type EntryType = {
    id: string
    primaryImage: {
        url: string
    }
    titleText: {
        text: string
    }
    genres: {
        genres: Array<GenreType>
    }
    ratingsSummary: {
        aggregateRating: number
    }
}

export const titlesAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        getJustReleasedTitles: builder.query<ResponseType, QueryParams>({
            query: ({ list, info }) => `?list=${list}&info=${info}`
        })
    })
})

export const { useGetJustReleasedTitlesQuery } =
    titlesAPI
