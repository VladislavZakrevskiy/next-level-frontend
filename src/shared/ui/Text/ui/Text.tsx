import { cn } from '@/shared/lib/classNames'
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
    S = 'size_s',
}

interface Props {
    className?: string
    text?: string
    title?: string
    theme?: TextTheme
    align?: TextAlign
    size?: TextSize
    'data-testid'?: string
}

type HeaderTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const mapSizetpHeaderTag: Record<TextSize, HeaderTag> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',
}

export const Text: FC<Props> = memo(
    ({
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
        'data-testid': dataTestId = 'Text',
    }) => {
        const TitleTag = mapSizetpHeaderTag[size]

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
                    <TitleTag
                        data-testid={dataTestId + '.Header'}
                        className={classes.title}
                    >
                        {title}
                    </TitleTag>
                )}
                {text && (
                    <p data-testid={dataTestId + '.Paragraph'} className={classes.text}>{text}</p>
                )}
            </div>
        )
    }
)
