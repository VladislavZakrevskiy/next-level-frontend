import { cn } from '@/shared/lib/classNames'
import { FC, HTMLAttributes, ReactNode } from 'react'
import classes from './Card.module.scss'


export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined'
}

interface Props extends HTMLAttributes<HTMLDivElement> {
    className?: string
    children: ReactNode
    theme?: CardTheme
    max?: boolean
}

export const Card: FC<Props> = ({
    className,
    children,
    theme = CardTheme.NORMAL, max,
    ...otherProps
}) => {
    return (
        <article
            className={cn(classes.Card, {[classes.max]: max}, [className, classes[theme]])}
            {...otherProps}
        >
            {children}
        </article>
    )
}
