import {
    configureStore,
    combineReducers,
    getDefaultMiddleware
} from '@reduxjs/toolkit'
import { showApi } from '../api/show/show.api'
import { watchListReducer } from './slices/watchListSlice'
import { userReducer } from './slices/userSlice'
import { likeListReducer } from './slices/likeListSlice'
import { filemoonAPI } from '../api/filemoon/filemoon.api'
import { playerReducer } from './slices/playerSlice'

const rootReducer = combineReducers({
    [showApi.reducerPath]: showApi.reducer,
    watchList: watchListReducer,
    user: userReducer,
    likeList: likeListReducer,
    [filemoonAPI.reducerPath]: filemoonAPI.reducer,
    player: playerReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(showApi.middleware, filemoonAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
