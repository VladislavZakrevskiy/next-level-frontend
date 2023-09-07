import { cn } from '@/shared/lib/classNames'
import { CSSProperties, FC, memo, useMemo } from 'react'
import classes from './Skeleton.module.scss'

interface Props {
    className?: string
    height?: string | number
    width?: string | number
    border?: string
}

export const Skeleton: FC<Props> = memo(({
    className,
    border,
    height,
    width,
}) => {

    const styles = useMemo<CSSProperties>(() => ({
        width, height, borderRadius: border
    }), [width, height, border])

    return (
        <div
            className={cn(classes.Skeleton, {}, [
                className,
            ])}
            style={styles}
        />
    )
})
