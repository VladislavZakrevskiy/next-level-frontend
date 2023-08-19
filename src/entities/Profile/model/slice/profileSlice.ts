import { createSlice } from '@reduxjs/toolkit'
import { ProfileSchema } from '../types/Profile'

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: true
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
})

export const {
    actions: ProfileActions,
    reducer: ProfileReducer,
} = profileSlice
