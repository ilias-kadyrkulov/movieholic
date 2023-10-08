import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = 'https://moviesdatabase.p.rapidapi.com/'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        headers: {
            'X-RapidAPI-Key': 'a376421de3mshd8a948cbafd302fp11bdc2jsn2db737ce265a',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
          }
    }),
    endpoints: (builder) => ({
        
    })
})

