import {configureStore} from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'

export const createReduxStore = (initaialState?: StateSchema) => {
    return configureStore<StateSchema>({
        reducer: {},
        devTools: __IS_DEV__,
        preloadedState: initaialState
    })
}