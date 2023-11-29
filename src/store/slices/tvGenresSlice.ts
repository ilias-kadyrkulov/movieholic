import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: Record<number, string> = {}

const tvGenresSlice = createSlice({
  name: 'tvGenres',
  initialState,
  reducers: {
    tvGenresReceived: (_state, action: PayloadAction<Record<number, string> | undefined>) => {
      return action.payload
    },
    tvGenresCleared: () => ({}),
  },
})

export const tvGenresActions = tvGenresSlice.actions
export const tvGenresReducer = tvGenresSlice.reducer
