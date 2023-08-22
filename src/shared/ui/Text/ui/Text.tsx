import { cn } from 'shared/lib/classNames'
import { FC, memo } from 'react'
import classes from './Text.module.scss'

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center'
}

interface Props {
    className?: string
    text?: string
    title?: string
    theme?: TextTheme
    align?: TextAlign
}

export const Text: FC<Props> = memo(
    ({
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT
    }) => {
        // classes.Text
        return (
            <div
                className={cn('', {}, [
                    className,
                    classes[theme],
                    classes[align]
                ])}
            >
                {title && (
                    <p className={classes.title}>{title}</p>
                )}
                {text && (
                    <p className={classes.text}>{text}</p>
                )}
            </div>
        )
    }
)
