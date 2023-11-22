import { createSlice } from '@reduxjs/toolkit'

const initialState: {shouldRunFunction: boolean} = {
    shouldRunFunction: true
}

const functionOptimizationSlice = createSlice({
    name: 'functionOptimization',
    initialState,
    reducers: {
        functionShouldRun: (state) => {
            state.shouldRunFunction = true
        },
        functionShouldNotRun: (state) => {
            state.shouldRunFunction = false
        }
    }
})

export const functionOptimizationActions = functionOptimizationSlice.actions
export const functionOptimizationReducer = functionOptimizationSlice.reducer
