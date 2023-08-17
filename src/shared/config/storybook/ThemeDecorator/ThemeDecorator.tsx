import { StoryFn } from '@storybook/react'
import {
    Theme,
    ThemeProvider,
} from '../../../../app/providers/ThemeProvider/index'

export const ThemeDecorator =
    (theme: Theme) => (Story: StoryFn) => {
        return (
            <ThemeProvider>
                <div className={`app ${theme}`}>
                    <Story />
                </div>
            </ThemeProvider>
        )
    }
