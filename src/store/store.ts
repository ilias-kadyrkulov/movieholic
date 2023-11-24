import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' //
import { showAPI } from '../api/show/show.api'
import { movieWatchlistReducer } from './slices/movieWatchlistSlice'
import { userReducer } from './slices/userSlice'
import { likeListReducer } from './slices/likeListSlice'
import { filemoonAPI } from '../api/filemoon/filemoon.api'
import { playerReducer } from './slices/playerSlice'
import { showReducer } from './slices/showSlice'
import { tmdbV3API } from '../api/tmdbV3/tmdb.api'
import { tmdbSessionReducer } from './slices/tmdbSessionSlice'
import { tmdbV4API } from '../api/tmdbV4/tmdb.api'
import { tmdbAccountReducer } from './slices/tmdbAccountSlice'
import { functionOptimizationReducer } from './slices/functionOptimizationSlice'

const rootReducer = combineReducers({
    [showAPI.reducerPath]: showAPI.reducer,
    movieWatchlist: movieWatchlistReducer,
    user: userReducer,
    likeList: likeListReducer,
    [filemoonAPI.reducerPath]: filemoonAPI.reducer,
    player: playerReducer,
    show: showReducer,
    [tmdbV3API.reducerPath]: tmdbV3API.reducer,
    tmdbSession: tmdbSessionReducer,
    [tmdbV4API.reducerPath] : tmdbV4API.reducer,
    tmdbAccount: tmdbAccountReducer,
    functionOptimization: functionOptimizationReducer
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [showAPI.reducerPath, filemoonAPI.reducerPath, tmdbV3API.reducerPath, tmdbV4API.reducerPath]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
          }).concat(
            showAPI.middleware,
            filemoonAPI.middleware,
            tmdbV3API.middleware,
            tmdbV4API.middleware
        )
})

export const persistor = persistStore(store)
export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
