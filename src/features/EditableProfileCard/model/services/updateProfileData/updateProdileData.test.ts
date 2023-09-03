import { Currency } from 'entities/Currency'
import { updateProfileData } from './updateProfileData'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { Country } from 'entities/Country'
import { ValidateProfileError } from '../../consts/ValidateProfileError'

const data = {
    username: 'admin',
    age: 17,
    country: Country.Russia,
    lastname: 'zakrevskiy',
    first: 'vlad',
    city: 'znm',
    currency: Currency.RUB,
}

describe('updateProfileData.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(
            updateProfileData,
            { profile: { form: data } }
        )
        thunk.api.put.mockReturnValue(
            Promise.resolve({ data })
        )
        const result = await thunk.callThunk()

        expect(thunk.api.put).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)
    })

    test('error', async () => {
        const thunk = new TestAsyncThunk(
            updateProfileData,
            { profile: { form: data } }
        )
        thunk.api.get.mockReturnValue(
            Promise.resolve({ status: 403 })
        )
        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toEqual([
            ValidateProfileError.SERVER_ERROR,
        ])
    })

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(
            updateProfileData,
            { profile: { form: { ...data, first: '' } } }
        )
        // thunk.api.get.mockReturnValue(
        //     Promise.resolve({ status: 403 })
        // )
        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ])
    })
})
