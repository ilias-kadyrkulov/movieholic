import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { WatchlistMovieType } from '../../api/tmdbV3/account.api'

let initialState: WatchlistMovieType[] = []

const movieWatchlistSlice = createSlice({
  name: 'movieWatchlist',
  initialState,
  reducers: {
    movieWatchlistReceived: (state, action: PayloadAction<WatchlistMovieType[]>) => {
      state.push(...action.payload)
    },
    movieDeletedFromWatchlist: (state, action: PayloadAction<number | undefined>) => {
      return state.filter((m) => m.id !== action.payload)
    },
    movieWatchlistCleared: () => {
      return []
    },
  },
})

export const movieWatchlistActions = movieWatchlistSlice.actions
export const movieWatchlistReducer = movieWatchlistSlice.reducer
