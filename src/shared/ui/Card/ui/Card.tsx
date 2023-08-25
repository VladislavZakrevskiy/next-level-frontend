import { cn } from 'shared/lib/classNames'
import { FC, HTMLAttributes, ReactNode } from 'react'
import classes from './Card.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
    className?: string
    children: ReactNode
}

export const Card: FC<Props> = ({
    className,
    children,
    ...otherProps
}) => {
    return (
        <article
            className={cn(classes.Card, {}, [className])}
            {...otherProps}
        >
            {children}
        </article>
    )
}
