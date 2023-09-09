import { StoryFn } from '@storybook/react'
import {
    ThemeProvider,
} from '../../../../app/providers/ThemeProvider/index'
import { Theme } from '@/shared/consts/theme'

export const ThemeDecorator =
    (theme: Theme) => (Story: StoryFn) => {
        return (
            <ThemeProvider initialTheme={theme}>
                <div className={`app ${theme}`}>
                    <Story />
                </div>
            </ThemeProvider>
        )
    }
