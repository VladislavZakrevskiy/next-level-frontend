import { cn } from '../../../shared/lib/classNames/classNames'
import { useState, type FC, useCallback, memo } from 'react'
import classes from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import {
    UserActions,
    getUserAuthData,
    isUserAdmin,
    isUserManager,
} from 'entities/User'
import { Text, TextTheme } from 'shared/ui/Text'
import {
    AppLink,
    AppLinkTheme,
} from '../../../shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Dropdown } from 'shared/ui/Dropdown'
import { Avatar } from 'shared/ui/Avatar'

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = memo(
    ({ className }) => {
        const { t } = useTranslation()
        const [isAuthModal, setIsAuthModal] =
            useState(false)
        const authData = useSelector(getUserAuthData)
        const dispatch = useDispatch()
        const isAdmin = useSelector(isUserAdmin)
        const isManager = useSelector(isUserManager)

        const onToggleModal = useCallback(() => {
            setIsAuthModal((prev) => !prev)
        }, [])

        const onLogout = useCallback(() => {
            dispatch(UserActions.logout())
        }, [])

        const isAdminPanelAvailable = isAdmin || isManager

        if (authData) {
            return (
                <div
                    className={cn(classes.navbar, {}, [
                        className,
                    ])}
                >
                    <Text
                        className={classes.title}
                        title="Zakrevskiy App"
                        theme={TextTheme.INVERTED}
                    />
                    <AppLink
                        to={RoutePath.article_create}
                        theme={AppLinkTheme.SECONDARY}
                        // className={classes.createBtn}
                    >
                        {t('Создать статью')}
                    </AppLink>
                    <Dropdown
                        className={classes.dropdown}
                        direction="bottom-left"
                        renderer={
                            <Avatar
                                src={authData.avatar || ''}
                                alt="Avatar"
                                size={30}
                            />
                        }
                        items={[
                            ...(isAdminPanelAvailable
                                ? [
                                      {
                                          content:
                                              t('Админка'),
                                          href: RoutePath.admin_panel,
                                      },
                                  ]
                                : []),
                            {
                                content: t('Профиль'),
                                onClick: onLogout,
                                href:
                                    RoutePath.profile +
                                    authData.id,
                            },
                            {
                                content: t('Выйти'),
                                onClick: onLogout,
                            },
                        ]}
                    />
                </div>
            )
        }

        return (
            <header
                className={cn(classes.navbar, {}, [
                    className,
                ])}
            >
                <Button
                    theme={ThemeButton.OUTLINE}
                    className={classes.links}
                    onClick={onToggleModal}
                >
                    {t('Войти')}
                </Button>
                {isAuthModal && (
                    <LoginModal
                        isOpen={isAuthModal}
                        onClose={onToggleModal}
                    />
                )}
            </header>
        )
    }
)
