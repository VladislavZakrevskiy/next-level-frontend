import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User, UserActions } from 'entities/User'
import i18n from 'shared/config/i18n/i18n'
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localStorage'

interface LoginByUsernameProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    { rejectValue: string }
>(
    'auth/loginByUsername',
    async (authData, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post<User>(
                'http://localhost:8000/login',
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
            return rejectWithValue(
                i18n.t('Вы ввели неверный логин или пароль')
            )
        }
    }
)
