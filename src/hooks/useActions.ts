import { bindActionCreators } from '@reduxjs/toolkit'
import { useAppDispatch } from './hooks'
import { movieWatchlistActions } from '../store/slices/movieWatchlistSlice'
import { userActions } from './../store/slices/userSlice'
import { likeListActions } from './../store/slices/likeListSlice'
import { playerActions } from './../store/slices/playerSlice'
import { showActions } from './../store/slices/showSlice'
import { tmdbSessionActions } from './../store/slices/tmdbSessionSlice'
import { tmdbAccountActions } from './../store/slices/tmdbAccountSlice';
import { functionOptimizationActions } from './../store/slices/functionOptimizationSlice';

const allActions = {
    ...movieWatchlistActions,
    ...userActions,
    ...likeListActions,
    ...playerActions,
    ...showActions,
    ...tmdbSessionActions,
    ...tmdbAccountActions,
    ...functionOptimizationActions
}

export const useActions = () => {
    const dispatch = useAppDispatch()

    return bindActionCreators(allActions, dispatch)
}
