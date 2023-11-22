import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'https://moviesdatabase.p.rapidapi.com/titles'

export const showAPI = createApi({
    reducerPath: 'showApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        headers: {
            'X-RapidAPI-Key':
                'c146500ff5msh18f8c3f380973acp1ec9bajsn4c59da064df6',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    }),
    endpoints: _ => ({})
})
