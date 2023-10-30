import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://filemoonapi.com/api/'
export const FILEMOON_API_KEY = '37373bvxy7xv6ruoa1n10'

export const filemoonAPI = createApi({
    reducerPath: 'filemoonApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (_) => ({})
})
