import { cn } from '../../../shared/lib/classNames/classNames'
import { useState, type FC, useCallback } from 'react'
import classes from './Navbar.module.scss'
import { AppLink } from 'shared/ui/AppLink'
import { AppLinkTheme } from '../../../shared/ui/AppLink'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button'
import { Modal } from 'shared/ui/Modal'

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
            >
                {t('Войти')}
            </Button>
            <Modal
                isOpen={isAuthModal}
                onClose={onToggleModal}
            >
                Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Rerum eaque, quidem harum
                dignissimos expedita reprehenderit. Ratione,
                voluptates. Assumenda architecto
                consequuntur, molestias accusantium ad minus
                voluptatibus ullam dolorem deleniti
                consectetur! Unde!
            </Modal>
        </div>
    )
}
