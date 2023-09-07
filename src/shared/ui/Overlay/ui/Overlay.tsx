import { cn } from '@/shared/lib/classNames';
import { FC } from 'react';
import classes from './Overlay.module.scss'

interface Props {
    className?: string
    onClick?: () => void
}

export const Overlay: FC<Props> = ({className, onClick}) => {
    return (
        <div onClick={onClick}
            className={cn(classes.Overlay, {}, [className])}
        />
    )
}