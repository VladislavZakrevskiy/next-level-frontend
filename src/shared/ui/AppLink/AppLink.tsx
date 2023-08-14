import { Link, LinkProps } from 'react-router-dom'
import { cn } from '../../../shared/lib/classNames'
import { FC } from 'react'
import classes from './AppLink.module.scss'

export enum AppLinkTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
	className?: string
	theme?: AppLinkTheme
}

export const AppLink: FC<AppLinkProps> = ({
	className,
	theme = AppLinkTheme.PRIMARY,
	to,
	children,
	...otherProps
}) => {
	return (
		<Link {...otherProps} className={cn(classes.AppLink, {}, [className, classes[theme]])} to={to}>
			{children}
		</Link>
	)
}
