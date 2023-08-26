import {
    AnyAction,
    Reducer,
    ReducersMapObject,
    combineReducers,
} from '@reduxjs/toolkit'
import {
    MountedReducer,
    ReducerManager,
    StateSchema,
    StateSchemaKey,
} from './StateSchema'

export function createReducerManager(
    initialReducers: ReducersMapObject<StateSchema>
): ReducerManager {
    const reducers = { ...initialReducers }

    let combinedReducer = combineReducers(reducers)

    let keysToRemove: StateSchemaKey[] = []
    const mountedReducers: MountedReducer = {}

    return {
        getReducerMap: () => reducers,

        reduce: (state: StateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state }
                for (let key of keysToRemove) {
                    delete state[key]
                }
                keysToRemove = []
            }
            return combinedReducer(state, action)
        },

        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return
            }

            reducers[key] = reducer
            mountedReducers[key] = true
            combinedReducer = combineReducers(reducers)
        },

        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return
            }

            delete reducers[key]
            mountedReducers[key] = false
            keysToRemove.push(key)

            combinedReducer = combineReducers(reducers)
        },

        getMountedReducers: () => mountedReducers
    }
}
