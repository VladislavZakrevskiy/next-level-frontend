import {
    DeepPartial,
    ReducersMapObject,
} from '@reduxjs/toolkit'
import { StoryFn } from '@storybook/react'
import {
    StateSchema,
    StoreProvider,
} from 'app/providers/StoreProvider'
import { AuthReducer } from 'features/AuthByUsername/model/slice/authSlice'

const defaultAsyncReducers: DeepPartial<
    ReducersMapObject<StateSchema>
> = {
    login: AuthReducer,
}

export const StoreDecorator =
    (
        initialState: DeepPartial<StateSchema>,
        asyncReducers?: DeepPartial<
            ReducersMapObject<StateSchema>
        >
    ) =>
    (Story: StoryFn) => {
        return (
            <StoreProvider
                initialSchema={initialState}
                asyncReducers={{
                    ...defaultAsyncReducers,
                    ...asyncReducers,
                }}
            >
                <Story />
            </StoreProvider>
        )
    }
