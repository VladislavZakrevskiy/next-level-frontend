import { cn } from 'shared/lib/classNames/classNames'
import { type FC, useState } from 'react'
import classes from './Sidebar.module.scss'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LanguageSwitcher } from 'widgets/LanguageSwitcher'
import { Button, ThemeButton } from 'shared/ui/Button'
import { SizeButton } from 'shared/ui/Button'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink'
import { useTranslation } from 'react-i18next'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import MainIcon from 'shared/assets/icons/main-20-20.svg'
import AboutIcon from 'shared/assets/icons/about-20-20.svg'

interface Props {
    className?: string
}

export const Sidebar: FC<Props> = ({ className }) => {
    const { t } = useTranslation()

    const [collapsed, setCollapsed] =
        useState<boolean>(false)

    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    return (
        <div
            data-testid="TEST"
            className={cn(
                classes.Sidebar,
                { [classes.collapsed]: collapsed },
                [className]
            )}
        >
            <Button
                theme={ThemeButton.BACKGROUND_INVERTED}
                data-testid="sidebar-toggle"
                onClick={onToggle}
                size={SizeButton.L}
                className={classes.collapsedBtn}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={classes.items}>
                <AppLink
                    to={RoutePath.main}
                    theme={AppLinkTheme.SECONDARY}
                    className={classes.item}
                >
                    <MainIcon className={classes.icon} />
                    <span className={classes.link}>
                        {t('Главная')}
                    </span>
                </AppLink>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={RoutePath.about}
                    className={classes.item}
                >
                    <AboutIcon className={classes.icon} />
                    <span className={classes.link}>
                        {t('О нас')}
                    </span>
                </AppLink>
            </div>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LanguageSwitcher short={collapsed} />
            </div>
        </div>
    )
}
