import { FILEMOON_API_KEY, filemoonAPI } from './filemoon.api'

export type FileType = {
    title: string
    file_code: string
}

const folderAPI = filemoonAPI.injectEndpoints({
    endpoints: (builder) => ({
        getFolderList: builder.query({
            query: (name) =>
                `folder/list?key=${FILEMOON_API_KEY}&name=${name}`
        })
    })
})

export const { useGetFolderListQuery } = folderAPI
