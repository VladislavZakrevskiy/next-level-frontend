import { cn } from 'shared/lib/classNames'
import { ButtonHTMLAttributes, FC } from 'react'
import classes from './Button.module.scss'

export enum ThemeButton {
    CLEAR = 'clear'
}

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
    theme?: ThemeButton
}

export const Button: FC<ButtonProps> = ({
	className,
	children,
    theme,
	...otherProps
}) => {
	return (
		<button
			{...otherProps}
			className={cn(classes.Button, {}, [className, classes[theme]])}
		>
			{children}
		</button>
	)
}

