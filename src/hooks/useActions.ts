import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "./hooks"
import { watchListActions } from './../store/slices/watchListSlice';
import { userActions } from './../store/slices/userSlice';

const allActions = {
    ...watchListActions,
    ...userActions
}

export const useActions = () => {
    const dispatch = useAppDispatch()

    return bindActionCreators(allActions, dispatch)
}