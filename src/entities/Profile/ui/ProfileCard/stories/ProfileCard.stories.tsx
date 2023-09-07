import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { ProfileCard } from '@/entities/Profile'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import avatar from '@/shared/assets/tests/storybook.jpg'

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ProfileCard>

const Template: StoryFn<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
    data: {
        username: 'admin',
        age: 22,
        country: Country.Ukraine,
        lastname: 'ulbi tv',
        first: 'asd',
        city: 'asf',
        currency: Currency.USD,
        avatar,
    },
}

export const withError = Template.bind({})
withError.args = {
    error: 'true',
}

export const Loading = Template.bind({})
Loading.args = {
    isLoading: true,
}
