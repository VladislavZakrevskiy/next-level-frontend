import { StateSchema } from 'app/providers/StoreProvider'
import { getLoginIsLoading } from './getLoginIsLoading'

describe('getLoginIsLoading.test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                isLoading: true,
            },
        }
        expect(
            getLoginIsLoading(state as StateSchema)
        ).toEqual(true)
    })

    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(
            getLoginIsLoading(state as StateSchema)
        ).toEqual(undefined)
    })
})
