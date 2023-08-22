import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { ProfileSchema } from 'entities/Profile'
import { UserSchema } from 'entities/User'
import { LoginSchema } from 'features/AuthByUsername/model/types/loginSchema'
import { NavigateOptions, To } from 'react-router-dom'

export interface StateSchema {
    user: UserSchema

    // Async reducers
    login?: LoginSchema
    profile?: ProfileSchema
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

export interface ThunkExtraArg {
    api: AxiosInstance
    nav?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T = string> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}