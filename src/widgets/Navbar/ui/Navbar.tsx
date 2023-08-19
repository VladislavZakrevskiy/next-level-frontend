import { cn } from '../../../shared/lib/classNames/classNames'
import { useState, type FC, useCallback, memo } from 'react'
import classes from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { UserActions, getUserAuthData } from 'entities/User'

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

        const onToggleModal = useCallback(() => {
            setIsAuthModal((prev) => !prev)
        }, [])

        const onLogout = useCallback(() => {
            dispatch(UserActions.logout())
        }, [])

        if (authData) {
            return (
                <div
                    className={cn(classes.navbar, {}, [
                        className,
                    ])}
                >
                    <Button
                        theme={ThemeButton.OUTLINE}
                        className={classes.links}
                        onClick={onLogout}
                    >
                        {t('Выйти')}
                    </Button>
                </div>
            )
        }

        return (
            <div
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
            </div>
        )
    }
)
