import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FileType } from "../../api/filemoon/file.api";

type PlayerType = {
    file_code: string
    enabled: boolean,
    fileList: FileType[] | undefined
}

const initialState: PlayerType = {
    file_code: '',
    enabled: false,
    fileList: []
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        playerEnabled: (state, action: PayloadAction<{file_code: string}>) => {
            state.enabled = true
            state.file_code = action.payload.file_code
        },
        playerDisabled: (state) => {
            state.enabled = false
            state.file_code = ''
            state.fileList = []
        },
        fileListReceived: (state, action: PayloadAction<FileType[] | undefined>) => {
            state.fileList?.push(...(action.payload ?? []))
        }
    }
})

export const playerActions = playerSlice.actions
export const playerReducer = playerSlice.reducer