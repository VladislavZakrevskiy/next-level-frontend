import {
    DeepPartial,
    ReducersMapObject,
    configureStore,
} from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { UserReducer } from 'entities/User'
import { createReducerManager } from './reducerManager'
import { $api } from 'shared/api/api'
import { NavigateOptions, To } from 'react-router-dom'

export const createReduxStore = (
    initaialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    nav?: (to: To, options?: NavigateOptions) => void
) => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: UserReducer,
    }

    const reducerManager =
        createReducerManager(rootReducers)

    // <StateSchema>
    const store = configureStore({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initaialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: { extraArgument: { api: $api, nav } },
            }),
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<
    typeof createReduxStore
>['dispatch']
