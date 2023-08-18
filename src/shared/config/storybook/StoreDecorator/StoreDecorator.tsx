import { DeepPartial } from '@reduxjs/toolkit'
import { StoryFn } from '@storybook/react'
import {
    StateSchema,
    StoreProvider,
} from 'app/providers/StoreProvider'

export const StoreDecorator =
    (initialState: DeepPartial<StateSchema>) => (Story: StoryFn) => {
        return (
            <StoreProvider initialSchema={initialState}>
                <Story />
            </StoreProvider>
        )
    }
