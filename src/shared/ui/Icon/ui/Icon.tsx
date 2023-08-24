import { cn } from 'shared/lib/classNames';
import { FC } from 'react';
import classes from './Icon.module.scss'

interface Props {
    className?: string
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const Icon: FC<Props> = ({className, Svg}) => {
    return (
        <Svg
            className={cn(classes.Icon, {}, [className])}
        />
    )
}