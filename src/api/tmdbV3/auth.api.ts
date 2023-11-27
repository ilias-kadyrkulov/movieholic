import { tmdbV3API } from './tmdb.api'

type TokenType = {
  success: boolean
  expires_at: string
  request_token: string
}

type SessionType = {
  success: boolean
  session_id: string
}

type SessionWithLoginRequestType = {
  username: string
  password: string
  request_token: string | null
}

export type AccountResponseType = {
  avatar: { tmdb: { avatar_path: string } }
  username: string
  iso_639_1: string
  iso_3166_1: string
}

const tmdbAuthAPI = tmdbV3API.injectEndpoints({
  endpoints: (builder) => ({
    authTMDB: builder.query({
      query: () => 'authentication',
    }),
    createRequestToken: builder.query<TokenType, void>({
      query: () => 'authentication/token/new',
    }),
    createSession: builder.mutation<SessionType, string | undefined>({
      query: (token) => ({
        url: 'authentication/session/new',
        method: 'POST',
        body: { request_token: token },
      }),
    }),
    validateTokenWithLogin: builder.mutation<TokenType, SessionWithLoginRequestType>({
      query: ({ username, password, request_token }) => ({
        url: 'authentication/token/validate_with_login',
        method: 'POST',
        body: { username, password, request_token: request_token },
      }),
    }),
    deleteSession: builder.mutation<{ success: boolean }, string | undefined>({
      query: (session_id) => ({
        url: 'authentication/session',
        method: 'DELETE',
        body: { session_id: session_id },
      }),
    }),
    getAccountDetails: builder.query<AccountResponseType, string | undefined>({
      query: (session_id) => `account?${session_id}`,
    }),
  }),
})

export const {
  useAuthTMDBQuery,
  useCreateRequestTokenQuery,
  useLazyCreateRequestTokenQuery,
  useCreateSessionMutation,
  useValidateTokenWithLoginMutation,
  useDeleteSessionMutation,
  useLazyGetAccountDetailsQuery,
  // usePrefetch
} = tmdbAuthAPI
