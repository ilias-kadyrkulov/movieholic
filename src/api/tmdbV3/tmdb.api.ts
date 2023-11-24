import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'https://api.themoviedb.org/3/'

let accountAccessToken = {
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWVjNjdjZGZiNDIxZjdhM2I4YWQyODk4MDBiOWZjOSIsInN1YiI6IjY1MzdhODE3YWUzNjY4MDEwYjliZDkzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OtHtxjp_L87aUh_rWIeP3fJpMcgRrBlU7ZoGo7ZBj9g',
    changeToken: function (newToken: string) {
        this.token = newToken
    }
}

export const tmdbV3API = createApi({
    reducerPath: 'tmdbApiV3',
    tagTypes: ['MovieWatchlist', 'TVWatchlist'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accountAccessToken.token}`
        }
    }),
    endpoints: () => ({})
})

export const tmdbApiConfig = {
    originalImage: (url: string | undefined) =>
        `https://image.tmdb.org/t/p/original${url}`,
    w500Image: (url: string | undefined) => `https://image.tmdb.org/t/p/w500${url}`
}
