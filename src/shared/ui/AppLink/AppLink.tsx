import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../lib/classNames/classNames'
import { memo, type FC } from 'react'
import classes from './AppLink.module.scss'

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string
    theme?: AppLinkTheme
}

export const AppLink: FC<AppLinkProps> = memo(
    ({
        className,
        theme = AppLinkTheme.PRIMARY,
        to,
        children,
        ...otherProps
    }) => {
        return (
            <Link
                {...otherProps}
                className={cn(classes.AppLink, {}, [
                    className,
                    classes[theme],
                ])}
                to={to}
            >
                {children}
            </Link>
        )
    }
)
