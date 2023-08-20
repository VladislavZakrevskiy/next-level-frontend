import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { User, UserActions } from 'entities/User'
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localStorage'

interface LoginByUsernameProps {
    username: string
    password: string
}

export enum LoginErrors {
    INCORRECT_DATA = '',
    SERVER_ERROR = '',
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>(
    'auth/loginByUsername',
    async (
        authData,
        { rejectWithValue, dispatch, extra: { api } }
    ) => {
        try {
            const response = await api.post<User>(
                '/login',
                authData
            )

            if (!response.data) {
                throw new Error()
            }

            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                JSON.stringify(response.data)
            )
            dispatch(UserActions.setAuthData(response.data))
            return response.data
        } catch (err) {
            console.error(err)
            return rejectWithValue('error')
        }
    }
)
