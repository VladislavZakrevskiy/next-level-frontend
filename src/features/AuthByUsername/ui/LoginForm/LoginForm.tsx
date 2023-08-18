import { cn } from 'shared/lib/classNames'
import { FC } from 'react'
import classes from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button'
import { Input } from 'shared/ui/Input'

interface Props {
    className?: string
}

export const LoginForm: FC<Props> = ({ className }) => {
    const { t } = useTranslation()

    return (
        <div
            className={cn(classes.LoginForm, {}, [
                className,
            ])}
        >
            <Input type="text" placeholder={t('Введите имя')}/>
            <Input type="password" placeholder={t('Введите пароль')}/>
            <Button>{t('Войти')}</Button>
        </div>
    )
}
