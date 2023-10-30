import { FILEMOON_API_KEY, filemoonAPI } from './filemoon.api'

type GetFileListResponseType = {
    result: {
        files: FileType[]
    } 
}
export type FileType = {
    title: string
    file_code: string
    thumbnail: string
}

const fileAPI = filemoonAPI.injectEndpoints({
    endpoints: (builder) => ({
        getFileInfo: builder.query({
            query: () =>
                `file/info?key=${FILEMOON_API_KEY}&file_code=njubzg9cgrp6`
        }),
        getFileList: builder.query<GetFileListResponseType, string | undefined>({
            query: (title) => `file/list?key=${FILEMOON_API_KEY}&title=${title}`
        })
    })
})

export const { useGetFileInfoQuery, useGetFileListQuery } = fileAPI
