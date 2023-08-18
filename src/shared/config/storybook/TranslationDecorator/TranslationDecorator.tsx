import { StoryFn } from '@storybook/react'
import { I18nextProvider } from 'react-i18next'
import { Suspense } from 'react'
import i18n from 'shared/config/i18n/i18n';

export const TranslationDecorator = (Story: StoryFn) => {
    return (
        <Suspense fallback=''>
            <I18nextProvider i18n={i18n}>
                <Story />
            </I18nextProvider>
        </Suspense>
    )
}
