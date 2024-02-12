import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AccountResponseType } from '@/api/tmdbV3/auth.api'

type AccountType = {
  avatar?: string | undefined
  username: string | undefined
  language: string
  country: string
}

const initialState: AccountType = {
  avatar: '',
  username: '',
  language: '',
  country: '',
}

const tmdbAccountSlice = createSlice({
  name: 'tmdbAccount',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<AccountResponseType>) => {
      state.username = action.payload.username
      state.avatar = action.payload.avatar.tmdb.avatar_path
      state.language = action.payload.iso_639_1
      state.country = action.payload.iso_3166_1
    },
    userLoggedOut: (state) => {
      state.username = ''
      state.avatar = ''
      state.language = ''
      state.country = ''
    },
  },
})

export const tmdbAccountActions = tmdbAccountSlice.actions
export const tmdbAccountReducer = tmdbAccountSlice.reducer
