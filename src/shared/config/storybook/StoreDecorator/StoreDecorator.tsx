import { StoryFn } from '@storybook/react'
import {
    StateSchema,
    StoreProvider,
} from 'app/providers/StoreProvider'
import { AuthReducer } from 'features/AuthByUsername/model/slice/authSlice'
import { ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const defaultAsyncReducers: ReducerList = {
    login: AuthReducer,
}

export const StoreDecorator =
    (
        initialState: DeepPartial<StateSchema>,
        asyncReducers?: ReducerList
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
