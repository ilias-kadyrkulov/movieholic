import { PayloadAction, createSlice } from '@reduxjs/toolkit'

let initialState: number[] = []

const tvSeriesWatchlistSlice = createSlice({
  name: 'tvSeriesWatchlist',
  initialState,
  reducers: {
    tvSeriesWatchlistReceived: (state, action: PayloadAction<number[]>) => {
      state.push(...action.payload)
    },
    tvSeriesDeletedFromWatchlist: (state, action: PayloadAction<number | undefined>) => {
      return state.filter((m) => m !== action.payload)
    },
    tvSeriesWatchlistCleared: () => [],
  },
})

export const tvSeriesWatchlistActions = tvSeriesWatchlistSlice.actions
export const tvSeriesWatchlistReducer = tvSeriesWatchlistSlice.reducer
