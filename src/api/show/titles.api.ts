import { showApi } from './show.api'

type GetPopularOfTheWeekResponseType = {
    entries: number
    next: string
    page: number
    results: SmallMediumEntryType[]
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
        titleText: {
            text: string
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

type GetWatchListResponseType = {
    entries: number
    results: SmallMediumEntryType[]
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
type GenreType = {
    id: string
    text: string
}

type QueryParams = {
    list: string
    info: string
}
type QueryParamsWithYear = QueryParams & { sort: string }

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
export type SmallMediumEntryType = EntryType & {
    titleType: { text: string }
    originalTitleText: {
        text: string
    }
}
export type TopRatedSeriesEntryType = EntryType & {
    releaseYear: { year: number }
    runtime: { seconds: number }
    plot: { plotText: { plainText: string } }
}

const titlesAPI = showApi.injectEndpoints({
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
        ),
        getWatchList: builder.query<
            GetWatchListResponseType,
            string[] | undefined
        >({
            query: (ids) => `x/titles-by-ids?idsList=${ids}&info=base_info`
        })
    })
})

export const {
    useGetPopularOfTheWeekQuery,
    useGetTopBoxOfficeQuery,
    useGetTopRatedSeriesQuery,
    useGetShowInfoByIdQuery,
    useGetCastInfoQuery,
    useGetWatchListQuery
} = titlesAPI
