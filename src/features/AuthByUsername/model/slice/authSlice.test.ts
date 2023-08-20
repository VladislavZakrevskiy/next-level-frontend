import { LoginSchema } from '../types/loginSchema'
import { AuthActions, AuthReducer } from './authSlice'

describe('authSlice.test', () => {
    test('should set username', () => {
        const state: DeepPartial<LoginSchema> = {
            username: 'username',
        }

        expect(
            AuthReducer(
                state as LoginSchema,
                AuthActions.setUsername('not username')
            )
        ).toEqual({ username: 'not username' })
    })

    test('should set password', () => {
        const state: DeepPartial<LoginSchema> = {
            password: 'password',
        }

        expect(
            AuthReducer(
                state as LoginSchema,
                AuthActions.setPassword('not password')
            )
        ).toEqual({ password: 'not password' })
    })
})
