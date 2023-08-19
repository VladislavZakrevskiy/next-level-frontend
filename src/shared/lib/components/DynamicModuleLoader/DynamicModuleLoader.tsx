import { Reducer } from '@reduxjs/toolkit'
import {
    ReduxStoreWithManager,
    StateSchemaKey,
} from 'app/providers/StoreProvider'
import { FC, ReactNode, useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'

export type ReducerList = {
    [name in StateSchemaKey]?: Reducer
}

type ReducerListEntry = [StateSchemaKey, Reducer]

interface Props {
    children: ReactNode
    reducers: ReducerList
    removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<Props> = ({
    children,
    reducers,
    removeAfterUnmount = true,
}) => {
    const store = useStore() as ReduxStoreWithManager
    const dispatch = useDispatch()

    useEffect(() => {
        Object.entries(reducers).forEach(
            ([name, reducer]: ReducerListEntry) => {
                store.reducerManager.add(name, reducer)
                dispatch({ type: `@INIT ${name} reducer` })
            }
        )

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(
                    ([name]: ReducerListEntry) => {
                        store.reducerManager.remove(name)
                        dispatch({
                            type: `@DESTROY ${name} reducer`,
                        })
                    }
                )
            }
        }
    }, [])

    return <>{children}</>
}
