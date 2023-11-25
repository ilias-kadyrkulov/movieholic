import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MovieType } from '../../api/tmdbV3/account.api'

let initialState: MovieType[] = []

const movieWatchlistSlice = createSlice({
  name: 'movieWatchlist',
  initialState,
  reducers: {
    movieWatchlistReceived: (state, action: PayloadAction<MovieType[]>) => {
      state.push(...action.payload)
    },
    movieDeletedFromWatchlist: (state, action: PayloadAction<number | undefined>) => {
      return state.filter((m) => m.id !== action.payload)
    },
    movieWatchlistCleared: () => ([]),
  },
})

export const movieWatchlistActions = movieWatchlistSlice.actions
export const movieWatchlistReducer = movieWatchlistSlice.reducer
