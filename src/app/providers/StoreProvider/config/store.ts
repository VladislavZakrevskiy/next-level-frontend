import {
    DeepPartial,
    ReducersMapObject,
    configureStore,
} from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { UserReducer } from 'entities/User'
import { createReducerManager } from './reducerManager'

export const createReduxStore = (
    initaialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>
) => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: UserReducer,
    }

    const reducerManager =
        createReducerManager(rootReducers)

    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initaialState,
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
