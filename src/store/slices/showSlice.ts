import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type ShowType = {
    title: string | undefined
    titleType: 'TV Series' | 'Movie' | string | null | undefined
    episodes?: number
}

const initialState: ShowType = {
    title: '',
    titleType: null,
    episodes: 0
}

const showSlice = createSlice({
    name: 'show',
    initialState,
    reducers: {
        showBeenClicked: (state, action: PayloadAction<ShowType>) => {
            state.title = action.payload.title
            state.titleType = action.payload.titleType
            state.episodes = action.payload.episodes
        }
    }
})

export const showReducer = showSlice.reducer
export const showActions = showSlice.actions
