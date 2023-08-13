import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext'
import { FC, ReactNode, useMemo, useState } from 'react'

interface IThemeProviderProps {
    children: ReactNode
}

const ThemeProvider: FC<IThemeProviderProps> = ({children}) => {
	const [theme, setTheme] = useState<Theme>(
		(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT
	)

	const defaultProps = useMemo(
		() => ({
			setTheme,
			theme,
		}),
		[theme]
	)

	return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
