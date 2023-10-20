import { api } from './api'

type GetPopularOfTheWeekResponseType = {
    entries: number
    next: string
    page: number
    results: PopularOfTheWeekEntryType[]
}
type GetTopBoxOfficeResponseType = {
    entries: number
    next: string
    page: number
    results: EntryType[]
}
type GetTopRatedSeriesResponseType = {
    entries: number
    next: string
    page: number
    results: TopRatedSeriesEntryType[]
}
type GetShowInfoByIdResponseType = {
    results: {
        id: string
        episodes: {
            episodes: { total: number }
        }
        titleType: {
            text: string
        }
        primaryImage: {
            url: string
        }
        genres: {
            genres: GenreType[]
        }
        originalTitleText: {
            text: string
        }
        releaseYear: {
            year: number
        }
        runtime: {
            displayableProperty: {
                value: {
                    plainText: string
                }
            }
        }
        plot: { plotText: { plainText: string } }
    }
}
export type GetCastInfoResponseType = {
    results: CastEntryType
}
type EdgesType = {
    node: {
        name: {
            nameText: {
                text: string
            }
            primaryImage: {
                url: string
            }
        }
        characters: ActorNameType[]
    }
}
type ActorNameType = {
    name: string
}

type QueryParams = {
    list: string
    info: string
}
type QueryParamsWithYear = QueryParams & { sort: string }

type GenreType = {
    id: string
    text: string
}

export type CastEntryType = {
    id: string
    cast: {
        edges: EdgesType[]
    }
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
export type PopularOfTheWeekEntryType = EntryType & {
    titleType: { text: string }
}
export type TopRatedSeriesEntryType = EntryType & {
    releaseYear: { year: number }
    runtime: { seconds: number }
    plot: { plotText: { plainText: string } }
}

export const titlesAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        getPopularOfTheWeek: builder.query<
            GetPopularOfTheWeekResponseType,
            QueryParams
        >({
            query: ({ list, info }) => `?list=${list}&info=${info}`
        }),
        getTopBoxOffice: builder.query<
            GetTopBoxOfficeResponseType,
            QueryParams
        >({
            query: ({ list, info }) => `?list=${list}&info=${info}`
        }),
        getTopRatedSeries: builder.query<
            GetTopRatedSeriesResponseType,
            QueryParamsWithYear
        >({
            query: ({ list, info, sort }) =>
                `?list=${list}&info=${info}&sort=${sort}`
        }),
        getShowInfoById: builder.query<
            GetShowInfoByIdResponseType,
            string | undefined
        >({
            query: (id) => `/${id}?info=base_info`
        }),
        getCastInfo: builder.query<GetCastInfoResponseType, string | undefined>(
            {
                query: (id) => `/${id}?info=extendedCast`
            }
        )
    })
})

export const {
    useGetPopularOfTheWeekQuery,
    useGetTopBoxOfficeQuery,
    useGetTopRatedSeriesQuery,
    useGetShowInfoByIdQuery,
    useGetCastInfoQuery
} = titlesAPI
