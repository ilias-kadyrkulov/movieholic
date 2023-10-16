import {
    configureStore,
    combineReducers,
    getDefaultMiddleware
} from '@reduxjs/toolkit'
import { api } from '../api/api'
import { titlesAPI } from '../api/titles.api'

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(titlesAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
