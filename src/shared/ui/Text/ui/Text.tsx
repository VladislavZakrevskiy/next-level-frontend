import { cn } from 'shared/lib/classNames'
import { FC, memo } from 'react'
import classes from './Text.module.scss'

export enum TextTheme {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    M = 'size_m',
    L = 'size_l',
}

interface Props {
    className?: string
    text?: string
    title?: string
    theme?: TextTheme
    align?: TextAlign
    size?: TextSize
}

export const Text: FC<Props> = memo(
    ({
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
    }) => {
        // classes.Text
        return (
            <div
                className={cn('', {}, [
                    className,
                    classes[theme],
                    classes[align],
                    classes[size],
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
