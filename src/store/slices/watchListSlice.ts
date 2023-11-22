import { PayloadAction, createSlice } from '@reduxjs/toolkit'

let initialState: number[] = []

const watchListSlice = createSlice({
    name: 'watchList',
    initialState,
    reducers: {
        watchListReceived: (state, action: PayloadAction<number[]>) => {
            //NOTE - Filtering duplicates in action.payload
            const uniqueElementsFromPayload = action.payload.filter((showId, index) => action.payload.indexOf(showId) === index)
            //NOTE - Changing and filtering state so there is no duplicates
            return state.concat(uniqueElementsFromPayload.filter(item => !state.includes(item)))
        },
        deleteShowById: (state, action: PayloadAction<number | undefined>) => {
            return state.filter(showId => showId != action.payload)
        },
        watchListCleared: () => {
            return []
        }
    }
})

export const watchListActions = watchListSlice.actions
export const watchListReducer = watchListSlice.reducer
