import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "./hooks"
import { watchListActions } from './../store/slices/watchListSlice';
import { userActions } from './../store/slices/userSlice';
import { likeListActions } from './../store/slices/likeListSlice';
import { playerActions } from './../store/slices/playerSlice';
import { showActions } from './../store/slices/showSlice';

const allActions = {
    ...watchListActions,
    ...userActions,
    ...likeListActions,
    ...playerActions,
    ...showActions
}

export const useActions = () => {
    const dispatch = useAppDispatch()

    return bindActionCreators(allActions, dispatch)
}