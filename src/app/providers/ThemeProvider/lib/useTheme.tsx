import { useContext } from 'react'
import { Theme, ThemeContext } from './ThemeContext'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/consts/localStorage'

interface UseThemeResult {
    toggleTheme: () => void
    theme: Theme
}

export const useTheme = (): UseThemeResult => {
    const { setTheme, theme } = useContext(ThemeContext)

    const toggleTheme = () => {
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
        localStorage.setItem(
            LOCAL_STORAGE_THEME_KEY,
            newTheme
        )
    }

    return { theme: theme || Theme.LIGHT, toggleTheme }
}
