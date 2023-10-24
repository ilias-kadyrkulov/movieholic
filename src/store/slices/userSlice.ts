import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type UserType = {
    email: string | null
    uid: string | null
}
const initialState: UserType = {
    email: '',
    uid: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<UserType>) => {
            state.uid = action.payload.uid
            state.email = action.payload.email
        },
        userLoggedOut: (state) => {
            state.uid = ''
            state.email = ''
        }
    }
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
