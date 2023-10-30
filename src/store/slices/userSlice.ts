import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { uid: string } = {
    uid: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<string>) => {
            state.uid = action.payload
        },
        userLoggedOut: (state) => {
            state.uid = ''
        }
    }
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
