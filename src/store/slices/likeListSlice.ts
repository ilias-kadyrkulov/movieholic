import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: string[] = []

export const likeListSlice = createSlice({
    name: 'likeList',
    initialState,
    reducers: {
        showGotLiked: (state, action: PayloadAction<string | undefined>) => {
            state.push(action.payload)
        },
        showGotUnliked: (state, action: PayloadAction<string | undefined>) => {
            return state.filter(showId => showId != action.payload)
        }
    }
})

export const likeListReducer = likeListSlice.reducer
export const likeListActions = likeListSlice.actions