import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type TMDBSessionType = {
    requestToken: string | undefined
    validatedToken: string | undefined
    sessionId: string | undefined
}

const initialState: TMDBSessionType = {
    requestToken: '',
    validatedToken: '',
    sessionId: ''
}

const tmdbSessionSlice = createSlice({
    name: 'tmdbSession',
    initialState,
    reducers: {
        requestTokenStored: (
            state,
            action: PayloadAction<{ request_token: string | undefined }>
        ) => {
            state.requestToken = action.payload.request_token
        },
        requestTokenValidatedWithLogin: (
            state,
            action: PayloadAction<{ request_token: string | undefined }>
        ) => {
            state.validatedToken = action.payload.request_token
        },
        requestTokenCleared: (state) => {
            state.requestToken = ''
        },
        validatedTokenCleared: (state) => {
            state.validatedToken = ''
        },
        sessionBeenStored: (
            state,
            action: PayloadAction<{ session_id: string | undefined }>
        ) => {
            state.sessionId = action.payload.session_id
        },
        sessionBeenDeleted: (state) => {
            state.sessionId = ''
        },
    }
})

export const tmdbSessionReducer = tmdbSessionSlice.reducer
export const tmdbSessionActions = tmdbSessionSlice.actions
