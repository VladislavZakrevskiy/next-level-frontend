import { StateSchema } from '@/app/providers/StoreProvider'
import { getProfileValidateError } from './getProfileValidateError'
import { ValidateProfileError } from '../../consts/ValidateProfileError'

describe('getProfileValidateError.test', () => {
    test('should return data', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateError: [
                    ValidateProfileError.INCORRECT_AGE,
                    ValidateProfileError.INCORRECT_USER_DATA,
                ],
            },
        }
        expect(
            getProfileValidateError(state as StateSchema)
        ).toEqual([
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_USER_DATA,
        ])
    })

    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(
            getProfileValidateError(state as StateSchema)
        ).toEqual(undefined)
    })
})
