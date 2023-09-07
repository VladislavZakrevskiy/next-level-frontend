import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import {
    editableProfileSchema,
} from '../types/editableProfileSchema'
import { ValidateProfileError } from "../consts/ValidateProfileError"
import {
    ProfileActions,
    ProfileReducer,
} from './profileSlice'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'

const data = {
    username: 'admin',
    age: 22,
    country: Country.Ukraine,
    lastname: 'ulbi tv',
    first: 'asd',
    city: 'asf',
    currency: Currency.USD,
}

describe('profileSlice.test', () => {
    test('test set readonly', () => {
        const state: DeepPartial<editableProfileSchema> = {
            readonly: false,
        }
        expect(
            ProfileReducer(
                state as editableProfileSchema,
                ProfileActions.setReadonly(true)
            )
        ).toEqual({ readonly: true })
    })

    test('test cancel edit', () => {
        const state: DeepPartial<editableProfileSchema> = {
            data,
            form: { username: '' },
        }

        expect(
            ProfileReducer(
                state as editableProfileSchema,
                ProfileActions.cancelEdit()
            )
        ).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data,
        })
    })

    test('test update profile', () => {
        const state: DeepPartial<editableProfileSchema> = {
            form: { username: '123' },
        }

        expect(
            ProfileReducer(
                state as editableProfileSchema,
                ProfileActions.updateProfile({
                    username: '123456',
                })
            )
        ).toEqual({
            form: { username: '123456' },
        })
    })

    test('test update profile service pending', () => {
        const state: DeepPartial<editableProfileSchema> = {
            isLoading: false,
            validateError: [
                ValidateProfileError.SERVER_ERROR,
            ],
        }

        expect(
            ProfileReducer(
                state as editableProfileSchema,
                updateProfileData.pending
            )
        ).toEqual({
            isLoading: true,
            validateError: undefined,
        })
    })

    test('test update profile service fullfiled', () => {
        const state: DeepPartial<editableProfileSchema> = {
            isLoading: true,
        }

        expect(
            ProfileReducer(
                state as editableProfileSchema,
                updateProfileData.fulfilled(data, '')
            )
        ).toEqual({
            isLoading: false,
            validateError: undefined,
            readonly: true,
            error: undefined,
            form: data,
            data,
        })
    })
})
