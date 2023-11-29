import { PayloadAction, createSlice } from '@reduxjs/toolkit'

let initialState: number[] = []

const movieFavoriteSlice = createSlice({
  name: 'movieFavorite',
  initialState,
  reducers: {
    movieFavoriteReceived: (state, action: PayloadAction<number[]>) => {
      state.push(...action.payload)
    },
    movieDeletedFromFavorite: (state, action: PayloadAction<number | undefined>) => {
      return state.filter((m) => m !== action.payload)
    },
    movieFavoriteCleared: () => ([])
  },
})

export const movieFavoriteActions = movieFavoriteSlice.actions
export const movieFavoriteReducer = movieFavoriteSlice.reducer
