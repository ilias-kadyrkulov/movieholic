import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Array<number> = []

export const likeListSlice = createSlice({
    name: 'likeList',
    initialState,
    reducers: {
        favoriteShowsReceived: (state, action: PayloadAction<number[]>) => {
            state.push(...action.payload)
        },
        showGotLiked: (state, action: PayloadAction<number>) => {
            state.push(action.payload)
        },
        showGotUnliked: (state, action: PayloadAction<number | undefined>) => {
            return state.filter(showId => showId != action.payload)
        },
        likeListCleared: () => {
            return []
        }
    }
})

export const likeListReducer = likeListSlice.reducer
export const likeListActions = likeListSlice.actions