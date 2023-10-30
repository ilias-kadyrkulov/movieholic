import { FILEMOON_API_KEY, filemoonAPI } from './filemoon.api'

const accountApi = filemoonAPI.injectEndpoints({
    endpoints: (builder) => ({
        getAccountInfo: builder.query({
            query: () => `account/info?key=${FILEMOON_API_KEY}`
        })
    })
})

export const { useGetAccountInfoQuery } = accountApi
