import { type FC } from 'react'
import {
    useTheme,
    Theme,
} from 'app/providers/ThemeProvider'
import LightIcon from 'shared/assets/icons/theme-light.svg'
import DarkIcon from 'shared/assets/icons/theme-dark.svg'
import { cn } from 'shared/lib/classNames'
import { Button, ThemeButton } from 'shared/ui/Button'

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
    className,
}) => {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={toggleTheme}
            className={cn('', {}, [className])}
        >
            {theme === Theme.DARK ? (
                <DarkIcon />
            ) : (
                <LightIcon />
            )}
        </Button>
    )
}
