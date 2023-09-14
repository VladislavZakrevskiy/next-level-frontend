import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/consts/localStorage'
import { Theme } from '@/shared/consts/theme'

interface UseThemeResult {
    toggleTheme: (saveAction: (theme: Theme) => void) => void
    theme: Theme
}

export const useTheme = (): UseThemeResult => {
    const { setTheme, theme } = useContext(ThemeContext)

    const toggleTheme = (saveAction: (thtme: Theme) => void) => {
        let newTheme: Theme
        switch (theme) {
            case Theme.DARK:
                newTheme = Theme.LIGHT
                break
            case Theme.LIGHT:
                newTheme = Theme.ORANGE
                break
            case Theme.ORANGE:
                newTheme = Theme.DARK
                break
            default:
                newTheme = Theme.LIGHT
            }
        setTheme?.(newTheme)
        saveAction(newTheme)
    }

    return { theme: theme || Theme.LIGHT, toggleTheme }
}
