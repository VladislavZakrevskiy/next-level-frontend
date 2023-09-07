import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { PreloadedState } from '@reduxjs/toolkit'
import LoginForm from './LoginForm'

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof LoginForm>

const Template: StoryFn<typeof LoginForm> = (args) => (
    <LoginForm {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.decorators = [
    StoreDecorator({
        login: { username: '123', password: 'asd' },
    }),
]

export const withError = Template.bind({})
withError.args = {}
withError.decorators = [
    StoreDecorator({
        login: {
            username: '123',
            password: 'asd',
            error: 'ERROR',
        },
    }),
]

export const Loading = Template.bind({})
Loading.args = {}
Loading.decorators = [
    StoreDecorator({
        login: { isLoading: true },
    }),
]
