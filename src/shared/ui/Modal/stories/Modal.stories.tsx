import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import { Modal } from '../index'

export default {
    title: 'widget/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Modal>

const Template: StoryFn<typeof Modal> = (args) => (
    <Modal {...args} />
)

export const Light = Template.bind({})
Light.args = {
    isOpen: true,
    children:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus vero possimus, at nam debitis expedita veniam dolorem earum ut, aliquid ipsa sed, accusantium deleniti atque harum. Tempora recusandae atque culpa sint omnis dicta doloribus beatae odit ad veritatis eius corporis minima libero veniam unde eveniet ex facere laboriosam, tenetur esse quo. Quam commodi harum quisquam officia. Laborum mollitia eaque praesentium reprehenderit quasi, enim optio maxime impedit eos voluptatum sed explicabo repudiandae dolorem fugit ab in illo quos adipisci beatae saepe. Magni id accusamus vel consectetur incidunt in quaerat ratione soluta omnis. Officiis quae quas culpa ab amet earum officia ipsam.',
}

export const Dark = Template.bind({})
Dark.args = {
    isOpen: true,
    children:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus vero possimus, at nam debitis expedita veniam dolorem earum ut, aliquid ipsa sed, accusantium deleniti atque harum. Tempora recusandae atque culpa sint omnis dicta doloribus beatae odit ad veritatis eius corporis minima libero veniam unde eveniet ex facere laboriosam, tenetur esse quo. Quam commodi harum quisquam officia. Laborum mollitia eaque praesentium reprehenderit quasi, enim optio maxime impedit eos voluptatum sed explicabo repudiandae dolorem fugit ab in illo quos adipisci beatae saepe. Magni id accusamus vel consectetur incidunt in quaerat ratione soluta omnis. Officiis quae quas culpa ab amet earum officia ipsam.',
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
