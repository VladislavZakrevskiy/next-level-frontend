import {
    PayloadAction,
    createSlice,
} from '@reduxjs/toolkit'
import { addCommentFormSchema } from '../types/addCommentForm'

const initialState: addCommentFormSchema = {}

const addcommentformSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByUsername.pending, (state) => {
    //             state.isLoading = true
    //             state.error = undefined
    //         })
    //         .addCase(loginByUsername.fulfilled, (state, action) => {
    //             state.isLoading = true

    //         })
    //         .addCase(loginByUsername.rejected, (state, action) => {
    //             state.isLoading = true
    //             state.error = action.payload
    //         })
    // },
})

export const {
    actions: AddCommentFormActions,
    reducer: AddCommentFormReducer,
} = addcommentformSlice
