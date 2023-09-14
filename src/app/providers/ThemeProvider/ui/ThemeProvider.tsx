import { useJsonSettings } from "@/entities/User";
import { Theme } from "@/shared/consts/theme";
import { ThemeContext } from "@/shared/lib/context/ThemeContext";
import {
	type FC,
	type ReactNode,
	useMemo,
	useState,
	useEffect,
} from "react";

interface IThemeProviderProps {
	children: ReactNode;
	initialTheme?: Theme;
}

export const ThemeProvider: FC<
	IThemeProviderProps
> = ({ children, initialTheme }) => {
	const defaultTheme =
		useJsonSettings()?.theme || Theme.LIGHT;

	const [isThemeInited, setIsThemeInited] =
		useState(false);
	const [theme, setTheme] = useState<Theme>(
		initialTheme || defaultTheme || Theme.LIGHT
	);

	useEffect(() => {
		if (!isThemeInited && defaultTheme) {
			setTheme(defaultTheme);
			setIsThemeInited(true);
		}
	}, [defaultTheme]);

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
