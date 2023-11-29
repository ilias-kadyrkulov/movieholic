import { bindActionCreators } from '@reduxjs/toolkit'
import { useAppDispatch } from './hooks'
import { movieWatchlistActions } from '../store/slices/movieWatchlistSlice'
import { likeListActions } from './../store/slices/likeListSlice'
import { playerActions } from './../store/slices/playerSlice'
import { showActions } from './../store/slices/showSlice'
import { tmdbSessionActions } from './../store/slices/tmdbSessionSlice'
import { tmdbAccountActions } from './../store/slices/tmdbAccountSlice';
import { functionOptimizationActions } from './../store/slices/functionOptimizationSlice';
import { movieFavoriteActions } from './../store/slices/movieFavoriteSlice';
import { movieGenresActions } from './../store/slices/movieGenresSlice';
import { latestReleasedMoviesActions } from './../store/slices/latestReleasedMoviesSlice';
import { tvSeriesWatchlistActions } from './../store/slices/tvSeriesWatchlistSlice';
import { tvGenresActions } from './../store/slices/tvGenresSlice';

const allActions = {
    ...movieWatchlistActions,
    ...tvSeriesWatchlistActions,
    ...movieFavoriteActions,
    ...movieGenresActions,
    ...tvGenresActions,
    ...likeListActions,
    ...playerActions,
    ...showActions,
    ...tmdbSessionActions,
    ...tmdbAccountActions,
    ...functionOptimizationActions,
    ...latestReleasedMoviesActions
}

export const useActions = () => {
    const dispatch = useAppDispatch()

    return bindActionCreators(allActions, dispatch)
}
