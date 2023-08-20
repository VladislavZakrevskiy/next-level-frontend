import { useContext } from 'react'
import { Theme, ThemeContext } from './ThemeContext'
import { LOCAL_STORAGE_THEME_KEY } from 'shared/consts/localStorage'

interface UseThemeResult {
    toggleTheme: () => void
    theme: Theme
}

export const useTheme = (): UseThemeResult => {
    const { setTheme, theme } = useContext(ThemeContext)

    const toggleTheme = () => {
        const newTheme =
            theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
        setTheme?.(newTheme)
        localStorage.setItem(
            LOCAL_STORAGE_THEME_KEY,
            newTheme
        )
    }

    return { theme: theme || Theme.LIGHT, toggleTheme }
}
