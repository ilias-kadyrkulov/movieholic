import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: ''
}

const showSlice = createSlice({
    name: 'show',
    initialState,
    reducers: {
        showBeenClicked: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        }
    }
})

export const showReducer = showSlice.reducer
export const showActions = showSlice.actions