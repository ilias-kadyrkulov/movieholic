import { FILEMOON_API_KEY, filemoonAPI } from './filemoon.api'

type GetThumbnailImageUrlResponseType = {
    result: ThumbnailImageUrlType
}
export type ThumbnailImageUrlType = {
    thumb_url: string
}

const thumbsAPI = filemoonAPI.injectEndpoints({
    endpoints: (builder) => ({
        getThumbnailImageUrl: builder.query<
            GetThumbnailImageUrlResponseType,
            void | undefined
        >({
            query: (fileCode) =>
                `images/thumb?key=${FILEMOON_API_KEY}&file_code=${fileCode}`
        })
    })
})

export const { useGetThumbnailImageUrlQuery } = thumbsAPI
