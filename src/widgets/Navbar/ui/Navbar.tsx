import { cn } from '../../../shared/lib/classNames/classNames'
import { type FC } from 'react'
import classes from './Navbar.module.scss'
import { AppLink } from 'shared/ui/AppLink'
import { AppLinkTheme } from '../../../shared/ui/AppLink'
import { useTranslation } from 'react-i18next'

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation()

  return (
        <div className={cn(classes.navbar, {}, [className])}>
          <div className={classes.links}>
                <AppLink to={'/'} theme={AppLinkTheme.SECONDARY}>
                  {t('Главная')}
              </AppLink>
                <AppLink
                  theme={AppLinkTheme.SECONDARY}
                  to={'/about'}
                >
                  {t('О нас')}
              </AppLink>
            </div>
      </div>
  )
}
