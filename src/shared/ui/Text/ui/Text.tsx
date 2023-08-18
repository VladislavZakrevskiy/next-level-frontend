import { cn } from 'shared/lib/classNames'
import { FC } from 'react'
import classes from './Text.module.scss'

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

interface Props {
    className?: string
    text?: string
    title?: string
    theme?: TextTheme
}

export const Text: FC<Props> = ({
    className,
    text,
    title,
    theme = TextTheme.PRIMARY,
}) => {
    // classes.Text
    return (
        <div
            className={cn('', {}, [
                className,
                classes[theme],
            ])}
        >
            {title && (
                <p className={classes.title}>{title}</p>
            )}
            {text && <p className={classes.text}>{text}</p>}
        </div>
    )
}
