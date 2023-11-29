import { PayloadAction, createSlice } from '@reduxjs/toolkit'

let initialState: number[] = []

const movieWatchlistSlice = createSlice({
  name: 'movieWatchlist',
  initialState,
  reducers: {
    movieWatchlistReceived: (state, action: PayloadAction<number[]>) => {
      state.push(...action.payload)
    },
    movieDeletedFromWatchlist: (state, action: PayloadAction<number | undefined>) => {
      return state.filter((m) => m !== action.payload)
    },
    movieWatchlistCleared: () => ([]),
  },
})

export const movieWatchlistActions = movieWatchlistSlice.actions
export const movieWatchlistReducer = movieWatchlistSlice.reducer
