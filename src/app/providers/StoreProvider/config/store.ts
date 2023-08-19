import {ReducersMapObject, configureStore} from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { UserReducer } from 'entities/User'
import { createReducerManager } from './reducerManager'

export const createReduxStore = (initaialState?: StateSchema) => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: UserReducer,
    }

    const reducerManager = createReducerManager(rootReducers)
    
    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initaialState
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}