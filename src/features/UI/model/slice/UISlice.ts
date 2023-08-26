import {
    PayloadAction,
    createSlice,
} from '@reduxjs/toolkit'
import { UISchema } from '../types/UISchema'

const initialState: UISchema = {
    scroll: {},
}

const UISlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            action: PayloadAction<{
                path: string
                position: number
            }>
        ) => {
            state.scroll[action.payload.path] =
                action.payload.position
        },
    },
})

export const { actions: UIActions, reducer: UIReducer } =
    UISlice
