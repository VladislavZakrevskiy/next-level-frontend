import { Mods, cn } from 'shared/lib/classNames/classNames'
import {
    memo,
    type ButtonHTMLAttributes,
    type FC,
} from 'react'
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
    disabled?: boolean
}

export const Button: FC<ButtonProps> = memo(
    ({
        className,
        children,
        theme = ThemeButton.OUTLINE,
        square,
        size = SizeButton.L,
        disabled,
        ...otherProps
    }) => {
        const mods:Mods = {
            [classes.square]: square,
            [classes.disabled]: disabled,
        }

        return (
            <button
                {...otherProps}
                className={cn(classes.Button, mods, [
                    className,
                    classes[theme],
                    classes[size],
                ])}
                disabled={disabled}
            >
                {children}
            </button>
        )
    }
)
