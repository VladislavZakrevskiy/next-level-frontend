import { cn } from '../../../shared/lib/classNames/classNames'
import { useState, type FC, useCallback } from 'react'
import classes from './Navbar.module.scss'
import { AppLink } from 'shared/ui/AppLink'
import { AppLinkTheme } from '../../../shared/ui/AppLink'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button'
import { Modal } from 'shared/ui/Modal'
import { LoginModal } from 'features/AuthByUsername'

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)

    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev)
    }, [])

    return (
        <div
            className={cn(classes.navbar, {}, [className])}
        >
            <Button
                theme={ThemeButton.OUTLINE}
                className={classes.links}
                onClick={onToggleModal}
            >
                {t('Войти')}
            </Button>
            <LoginModal
                isOpen={isAuthModal}
                onClose={onToggleModal}
            />
        </div>
    )
}
