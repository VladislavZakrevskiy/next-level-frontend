import { cn } from '../../../shared/lib/classNames'
import { FC } from 'react'
import classes from './Navbar.module.scss'
import { AppLink } from 'shared/ui/AppLink'
import { AppLinkTheme } from '../../../shared/ui/AppLink'

interface NavbarProps {
	className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
	return (
		<div className={cn(classes.navbar, {}, [className])}>
			<div className={classes.links}>
				<AppLink to={'/'} theme={AppLinkTheme.SECONDARY} className={classes.mainlink}>
					Main
				</AppLink>
				<AppLink theme={AppLinkTheme.SECONDARY} to={'/about'}>
					About
				</AppLink>
			</div>
		</div>
	)
}
