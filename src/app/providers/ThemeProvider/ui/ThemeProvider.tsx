import { LOCAL_STORAGE_THEME_KEY } from "@/shared/consts/localStorage";
import { Theme } from "@/shared/consts/theme";
import { ThemeContext } from "@/shared/lib/context/ThemeContext";
import {
	type FC,
	type ReactNode,
	useMemo,
	useState,
} from "react";

interface IThemeProviderProps {
	children: ReactNode;
	initialTheme?: Theme;
}

const defaultTheme =
	(localStorage.getItem(
		LOCAL_STORAGE_THEME_KEY
	) as Theme) || Theme.LIGHT;

export const ThemeProvider: FC<
	IThemeProviderProps
> = ({ children, initialTheme }) => {
	const [theme, setTheme] = useState<Theme>(
		initialTheme || defaultTheme
	);

	const defaultProps = useMemo(
		() => ({
			setTheme,
			theme,
		}),
		[theme]
	);

	return (
		<ThemeContext.Provider value={defaultProps}>
			{children}
		</ThemeContext.Provider>
	);
};
