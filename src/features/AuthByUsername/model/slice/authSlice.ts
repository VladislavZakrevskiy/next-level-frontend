import {
    PayloadAction,
    createSlice,
} from '@reduxjs/toolkit'
import { LoginSchema } from '../types/loginSchema'
import { loginByUsername } from '../services/LoginByUsername/LoginByUsername'

const initialState: LoginSchema = {
    isLoading: false,
    password: '',
    username: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUsername: (
            state,
            action: PayloadAction<string>
        ) => {
            state.username = action.payload
        },
        setPassword: (
            state,
            action: PayloadAction<string>
        ) => {
            state.password = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(loginByUsername.fulfilled, (state, action) => {
                state.isLoading = true

            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = true
                state.error = action.payload
            })
    },
})

export const {
    actions: AuthActions,
    reducer: AuthReducer,
} = authSlice
