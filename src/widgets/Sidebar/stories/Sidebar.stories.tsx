import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { Sidebar } from '../ui/Sidebar/Sidebar'

export default {
    title: 'widget/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Sidebar>

const Template: StoryFn<typeof Sidebar> = (args) => (
    <Sidebar {...args} />
)

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [
    StoreDecorator({
        user: { authData: {} },
    }),
]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        user: { authData: {} },
    }),
]

export const NoAuth = Template.bind({})
NoAuth.args = {}
NoAuth.decorators = [
    StoreDecorator({
        user: {},
    }),
]
