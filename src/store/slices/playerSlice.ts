import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FileType } from '@/api/filemoon/file.api'

type PlayerType = {
    enabled: boolean
    fileList: FileType[] | undefined
    fileChosen: FileType
}

const initialState: PlayerType = {
    enabled: false,
    fileList: [],
    fileChosen: {
        title: '',
        file_code: '',
        thumbnail: ''
    }
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        fileBeenChosen: (state, action: PayloadAction<FileType>) => {
            state.enabled = true
            state.fileChosen = action.payload
        },
        fileListEmptied: (state) => {
            state.enabled = false
            state.fileList = []
        },
        fileListReceived: (
            state,
            action: PayloadAction<FileType[] | undefined>
        ) => {
            state.fileList?.push(...(action.payload ?? []))
        }
    }
})

export const playerActions = playerSlice.actions
export const playerReducer = playerSlice.reducer
