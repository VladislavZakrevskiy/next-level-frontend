import { StateSchema } from 'app/providers/StoreProvider'
import { getProfileForm } from './getProfileForm'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'

describe('getProfileForm.test', () => {
    test('should return data', () => {
        const form = {
            username: 'admin',
            age: 17,
            country: Country.Russia,
            lastname: 'zakrevskiy',
            first: 'vlad',
            city: 'znm',
            currency: Currency.RUB,
        }
        const state: DeepPartial<StateSchema> = {
            profile: {
                form,
            },
        }
        expect(
            getProfileForm(state as StateSchema)
        ).toEqual(form)
    })

    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(
            getProfileForm(state as StateSchema)
        ).toEqual(undefined)
    })
})
