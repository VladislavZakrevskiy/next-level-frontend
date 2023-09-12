import { cn } from '@/shared/lib/classNames'
import {
    CSSProperties,
    FC,
    ReactNode,
    useMemo,
} from 'react'
import classes from './Flex.module.scss'

export type FlexJustify =
    | 'start'
    | 'center'
    | 'end'
    | 'between'
export type FlexAlign = 'start' | 'center' | 'end'
export type FlexDirection = 'row' | 'column'
export type FlexGap = '0' | '4' | '8' | '16' | '32'

type DivProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>

export interface FlexProps extends DivProps {
    className?: string
    children: ReactNode
    justify?: FlexJustify
    align?: FlexAlign
    direction?: FlexDirection
    gap?: FlexGap
    max?: boolean
}

const justifyClasses: Record<FlexJustify, string> = {
    start: classes.justifyStart,
    end: classes.justifyEnd,
    center: classes.justifyCenter,
    between: classes.justifyBetween,
}

const alignClasses: Record<FlexAlign, string> = {
    start: classes.alignStart,
    end: classes.alignEnd,
    center: classes.alignCenter,
}

const directionClasses: Record<FlexDirection, string> = {
    row: classes.row,
    column: classes.column,
}

const gapClasses: Record<FlexGap, string> = {
    '0': classes.gap0,
    '4': classes.gap4,
    '8': classes.gap8,
    '16': classes.gap16,
    '32': classes.gap32,
}

export const Flex: FC<FlexProps> = (props) => {
    const {
        className,
        children,
        direction = 'row',
        align = 'center',
        justify = 'start',
        gap = '0',
        max = false,
        ...otherProps
    } = props

    const classNames = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gapClasses[gap],
    ]

    const mods = {
        [classes.max]: max,
    }

    return (
        <div {...otherProps} className={cn(classes.Flex, mods, classNames)}>
            {children}
        </div>
    )
}
