import { cn } from 'shared/lib/classNames/classNames'
import { type ButtonHTMLAttributes, type FC } from 'react'
import classes from './Button.module.scss'

export enum ThemeButton {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clear_inverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum SizeButton {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: ThemeButton
    square?: boolean
    size?: SizeButton
}

export const Button: FC<ButtonProps> = ({
    className,
    children,
    theme,
    square,
    size,
    ...otherProps
}) => {
    const mods: Record<string, boolean> = {
        [classes.square]: square,
    }

    return (
        <button
            {...otherProps}
            className={cn(classes.Button, mods, [
                className,
                classes[theme],
                classes[size],
            ])}
        >
            {children}
        </button>
    )
}
