import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit'
import { UserSchema } from 'entities/User'
import { loginSchema } from 'features/AuthByUsername'

export interface StateSchema {
    user: UserSchema

    // Async reducers
    login?: loginSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReduxStoreWithManager
    extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (
        state: StateSchema,
        action: AnyAction
    ) => CombinedState<StateSchema>
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}
