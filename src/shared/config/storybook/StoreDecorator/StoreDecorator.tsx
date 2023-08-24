import { StoryFn } from '@storybook/react'
import {
    StateSchema,
    StoreProvider,
} from 'app/providers/StoreProvider'
import { ArticleDetailsReducer } from 'entities/Article/model/slice/ArticleDetailsSlice'
import { ProfileReducer } from 'entities/Profile'
import { AuthReducer } from 'features/AuthByUsername/model/slice/authSlice'
import { ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const defaultAsyncReducers: ReducerList = {
    login: AuthReducer,
    profile: ProfileReducer,
    articleDetais: ArticleDetailsReducer,
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
