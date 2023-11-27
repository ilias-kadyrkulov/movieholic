import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MovieType } from '../../types/types'

let initialState: MovieType[] = []

const maxArrayLength = 10

const latestReleasedMoviesSlice = createSlice({
  name: 'latestReleasedMovies',
  initialState,
  reducers: {
    latestReleasedMovieReceived: (state, action: PayloadAction<MovieType[]>) => {
      if (initialState.length === maxArrayLength) {
        state.slice(1).push(...action.payload)
      } else {
        state.push(...action.payload)
      }
    },
    latestReleasedMoviesCleared: () => ([])
  },
})

export const latestReleasedMoviesActions = latestReleasedMoviesSlice.actions
export const latestReleasedMoviesReducer = latestReleasedMoviesSlice.reducer
