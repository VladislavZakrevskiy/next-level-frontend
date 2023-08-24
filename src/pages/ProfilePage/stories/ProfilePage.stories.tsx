// import React from 'react'
// import { Meta, StoryFn } from '@storybook/react'
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
// import { Theme } from 'app/providers/ThemeProvider'
// import ProfilePage from 'pages/ProfilePage/ui/ProfilePage'
// import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
// import { Country } from 'entities/Country'
// import { Currency } from 'entities/Currency'

// export default { 
//     title: 'pages/ProfilePage',
//     component: ProfilePage,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as Meta<typeof ProfilePage>

// const Template: StoryFn<typeof ProfilePage> = () => (
//     <ProfilePage /> 
// )

// export const Normal = Template.bind({})
// Normal.args = {}
// Normal.decorators = [
//     StoreDecorator({
//         profile: {
//             form: {
//                 username: 'admin',
//                 age: 17,
//                 country: Country.Russia,
//                 lastname: 'zakrevskiy',
//                 first: 'vlad',
//                 city: 'znm',
//                 currency: Currency.RUB,
//             },
//         },
//     }),
// ]

// export const Dark = Template.bind({})
// Dark.args = {}
// Dark.decorators = [
//     ThemeDecorator(Theme.DARK),
//     StoreDecorator({
//         profile: {
//             username: 'admin',
//             age: 17,
//             country: Country.Russia,
//             lastname: 'zakrevskiy',
//             first: 'vlad',
//             city: 'znm',
//             currency: Currency.RUB,
//         },
//     }),
// ]
