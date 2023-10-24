import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "./hooks"
import { watchListActions } from './../store/slices/watchListSlice';
import { userActions } from './../store/slices/userSlice';
import { likeListActions } from './../store/slices/likeListSlice';

const allActions = {
    ...watchListActions,
    ...userActions,
    ...likeListActions
}

export const useActions = () => {
    const dispatch = useAppDispatch()

    return bindActionCreators(allActions, dispatch)
}