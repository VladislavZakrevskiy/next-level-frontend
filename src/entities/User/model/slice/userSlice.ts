import { createSlice } from '@reduxjs/toolkit'
import { UserSchema } from '../types/User'

const initialState: UserSchema = {
    authData: undefined,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
})

export const {
    reducer: UserReducer,
    actions: UserActions,
} = userSlice
