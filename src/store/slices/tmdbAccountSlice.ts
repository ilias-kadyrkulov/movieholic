import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type AccountType = {
    avatar? : string | undefined
    username: string | undefined
}

const initialState: AccountType = {
    avatar: '',
    username: ''
}

const tmdbAccountSlice = createSlice({
    name: 'tmdbAccount',
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<AccountType>) => {
            state.username = action.payload.username
            state.avatar = action.payload.avatar
        },
        userLoggedOut: (state) => {
            state.username = ''
            state.avatar = ''
        }
    }
})

export const tmdbAccountActions = tmdbAccountSlice.actions
export const tmdbAccountReducer = tmdbAccountSlice.reducer
