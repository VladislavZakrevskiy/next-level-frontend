import { cn } from '@/shared/lib/classNames';
import { CSSProperties, FC, useMemo } from 'react';
import classes from './Avatar.module.scss'

interface Props {
    className?: string
    src: string
    alt: string
    size?: number
}

export const Avatar: FC<Props> = ({className, alt, src, size }) => {
    
    const styles = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100
    }), [size])
    
    return (
        <img src={src} alt={alt} style={styles}
            className={cn(classes.Avatar, {}, [className])}
        />
    )
}