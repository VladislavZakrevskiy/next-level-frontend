import {
	memo,
	type FC,
	useCallback,
} from "react";
import { Theme } from "@/shared/consts/theme";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import LightIcon from "@/shared/assets/icons/theme-light.svg";
import DarkIcon from "@/shared/assets/icons/theme-dark.svg";
import { cn } from "@/shared/lib/classNames";
import {
	Button,
	ThemeButton,
} from "@/shared/ui/Button";
import { saveJsonSettings } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> =
	memo(({ className }) => {
		const { theme, toggleTheme } = useTheme();
		const dispatch = useAppDispatch();

		const onToggle = useCallback(() => {
			toggleTheme((newTheme) =>
				dispatch(
					saveJsonSettings({ theme: newTheme })
				)
			);
		}, [toggleTheme]);

		return (
			<Button
				theme={ThemeButton.CLEAR}
				onClick={onToggle}
				className={cn("", {}, [className])}
			>
				{theme === Theme.DARK ? (
					<DarkIcon />
				) : (
					<LightIcon />
				)}
			</Button>
		);
	});
