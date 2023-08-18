import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Text, TextTheme } from '../index'

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as Meta<typeof Text>

const Template: StoryFn<typeof Text> = (args) => (
    <Text {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
    title: 'Title lorem',
    text: 'Text impus',
}

export const OnlyTitle = Template.bind({})
OnlyTitle.args = {
    title: 'Title lorem',
}

export const OnlyText = Template.bind({})
OnlyText.args = {
    text: 'Text impus',
}

export const PrimaryDark = Template.bind({})
PrimaryDark.args = {
    title: 'Title lorem',
    text: 'Text impus',
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTitleDark = Template.bind({})
OnlyTitleDark.args = {
    title: 'Title lorem',
}
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTextDark = Template.bind({})
OnlyTextDark.args = {
    text: 'Text impus',
}
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Error = Template.bind({})
OnlyText.args = {
    title: 'Title lorem',
    text: 'Text impus',
    theme: TextTheme.ERROR,
}
