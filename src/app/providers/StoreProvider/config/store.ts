import {ReducersMapObject, configureStore} from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { UserReducer } from 'entities/User'

export const createReduxStore = (initaialState?: StateSchema) => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: UserReducer
    }
    
    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initaialState
    })
}