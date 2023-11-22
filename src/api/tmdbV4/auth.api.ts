import { tmdbV4API } from './tmdb.api'

type RequestTokenType = {
    request_token: string
    success: boolean
    status_message: string
    status_code: number
}

type AccessTokenType = {
    access_token: string
    success: boolean
    status_message: string
    status_code: number
    account_id: string
}

// type SessionWithLoginRequestType = {
//     username: string
//     password: string
//     request_token: string | null
// }

const tmdbAuthAPI = tmdbV4API.injectEndpoints({
    endpoints: (builder) => ({
        createRequestTokenV4: builder.query<RequestTokenType, void>({
            query: () => ({
                url: 'auth/request_token'
            })
        }),
        createAccessTokenV4: builder.query<AccessTokenType, string>({
            query: (requestToken) => ({
                url: 'auth/access_token',
                body: requestToken
            })
        })
    })
})

export const {
    useLazyCreateRequestTokenV4Query,
    useLazyCreateAccessTokenV4Query
} = tmdbAuthAPI
