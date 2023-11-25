import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: Record<number, string> = {}

const movieGenresSlice = createSlice({
  name: 'movieGenres',
  initialState,
  reducers: {
    movieGenresReceived: (_state, action: PayloadAction<Record<number, string> | undefined>) => {
      return action.payload
    },
    movieGenresCleared: () => ({})
  },
})

export const movieGenresActions = movieGenresSlice.actions
export const movieGenresReducer = movieGenresSlice.reducer
