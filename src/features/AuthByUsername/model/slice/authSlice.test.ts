import { DeepPartial } from '@reduxjs/toolkit'
import { loginSchema } from '../types/loginSchema'
import { AuthActions, AuthReducer } from './authSlice'
import { loginByUsername } from '../services/LoginByUsername/LoginByUsername'

describe('authSlice.test', () => {
    test('should set username', () => {
        const state: DeepPartial<loginSchema> = {
            username: 'username',
        }

        expect(
            AuthReducer(
                state as loginSchema,
                AuthActions.setUsername('not username')
            )
        ).toEqual({ username: 'not username' })
    })

    test('should set password', () => {
        const state: DeepPartial<loginSchema> = {
            password: 'password',
        }

        expect(
            AuthReducer(
                state as loginSchema,
                AuthActions.setPassword('not password')
            )
        ).toEqual({ password: 'not password' })
    })
})
