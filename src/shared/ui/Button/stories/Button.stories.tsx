import React from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/consts/theme'
import { Button, SizeButton, ThemeButton } from '../index'

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Button>

const Template: StoryFn<typeof Button> = (args) => (
    <Button {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
    children: 'Text',
}

export const Clear = Template.bind({})
Clear.args = {
    children: 'Text',
    theme: ThemeButton.CLEAR,
}

export const ClearInverted = Template.bind({})
ClearInverted.args = {
    children: 'Text',
    theme: ThemeButton.CLEAR_INVERTED,
}

export const Outline = Template.bind({})
Outline.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
}

export const OutlineDark = Template.bind({})
OutlineDark.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
}
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Background = Template.bind({})
Background.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND,
}

export const BackgroundInverted = Template.bind({})
BackgroundInverted.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
}

export const Disabled = Template.bind({})
Disabled.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
    disabled: true,
}

export const SquareSizeM = Template.bind({})
SquareSizeM.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true,
    size: SizeButton.M,
}

export const SquareSizeL = Template.bind({})
SquareSizeL.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true,
    size: SizeButton.L,
}

export const SquareSizeXL = Template.bind({})
SquareSizeXL.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true,
    size: SizeButton.XL,
}
