import { cn } from 'shared/lib/classNames/classNames'
import { type ButtonHTMLAttributes, type FC } from 'react'
import classes from './Button.module.scss'

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline'
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
