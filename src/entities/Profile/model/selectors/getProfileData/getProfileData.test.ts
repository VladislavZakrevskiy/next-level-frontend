import { StateSchema } from 'app/providers/StoreProvider'
import { getProfileData } from './getProfileData'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'

describe('getProfileData.test', () => {
    test('should return data', () => {
        const data = {
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
                data,
            },
        }
        expect(
            getProfileData(state as StateSchema)
        ).toEqual(data)
    })

    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(
            getProfileData(state as StateSchema)
        ).toEqual(undefined)
    })
})
