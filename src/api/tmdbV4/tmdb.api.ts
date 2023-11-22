import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'https://api.themoviedb.org/4/'

export const tmdbV4API = createApi({
    reducerPath: 'tmdbApiV4',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWVjNjdjZGZiNDIxZjdhM2I4YWQyODk4MDBiOWZjOSIsInN1YiI6IjY1MzdhODE3YWUzNjY4MDEwYjliZDkzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OtHtxjp_L87aUh_rWIeP3fJpMcgRrBlU7ZoGo7ZBj9g`
        }
    }),
    endpoints: () => ({})
})
