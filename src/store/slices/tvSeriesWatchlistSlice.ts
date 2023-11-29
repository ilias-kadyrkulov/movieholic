import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TVType } from '../../types/types'

let initialState: TVType[] = []

const tvSeriesWatchlistSlice = createSlice({
  name: 'tvSeriesWatchlist',
  initialState,
  reducers: {
    tvSeriesWatchlistReceived: (state, action: PayloadAction<TVType[]>) => {
      state.push(...action.payload)
    },
    tvSeriesDeletedFromWatchlist: (state, action: PayloadAction<number | undefined>) => {
      return state.filter((m) => m.id !== action.payload)
    },
    tvSeriesWatchlistCleared: () => [],
  },
})

export const tvSeriesWatchlistActions = tvSeriesWatchlistSlice.actions
export const tvSeriesWatchlistReducer = tvSeriesWatchlistSlice.reducer
