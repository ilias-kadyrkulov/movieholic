import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MovieType } from '../../types/types'

let initialState: MovieType[] = []

const movieFavoriteSlice = createSlice({
  name: 'movieFavorite',
  initialState,
  reducers: {
    movieFavoriteReceived: (state, action: PayloadAction<MovieType[]>) => {
      state.push(...action.payload)
    },
    movieDeletedFromFavorite: (state, action: PayloadAction<number | undefined>) => {
      return state.filter((m) => m.id !== action.payload)
    },
    movieFavoriteCleared: () => ([])
  },
})

export const movieFavoriteActions = movieFavoriteSlice.actions
export const movieFavoriteReducer = movieFavoriteSlice.reducer
