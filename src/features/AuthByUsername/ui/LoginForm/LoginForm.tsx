import { cn } from 'shared/lib/classNames'
import { FC, memo, useCallback } from 'react'
import classes from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button'
import { Input } from 'shared/ui/Input'
import { useDispatch, useSelector } from 'react-redux'
import {
    AuthActions,
    getLoginState,
    loginByUsername,
} from 'features/AuthByUsername'
import { Text, TextTheme } from 'shared/ui/Text'

interface Props {
    className?: string
}

export const LoginForm: FC<Props> = memo(
    ({ className }) => {
        const { t } = useTranslation()
        const { password, username, isLoading, error } =
            useSelector(getLoginState)
        const dispatch = useDispatch()

        const onChangeUsername = useCallback(
            (value: string) => {
                dispatch(AuthActions.setUsername(value))
            },
            [dispatch]
        )

        const onChangePassword = useCallback(
            (value: string) => {
                dispatch(AuthActions.setPassword(value))
            },
            [dispatch]
        )

        const onLoginClick = useCallback(() => {
            dispatch(
                loginByUsername({ username, password })
            )
        }, [dispatch, username, password])

        return (
            <div
                className={cn(classes.LoginForm, {}, [
                    className,
                ])}
            >
                <Text title={t('Форма авторизации')} />
                {error && (
                    <Text
                        text={error}
                        theme={TextTheme.ERROR}
                    />
                )}
                <Input
                    type="text"
                    placeholder={t('Введите имя')}
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    type="password"
                    placeholder={t('Введите пароль')}
                    value={password}
                    onChange={onChangePassword}
                />
                <Button
                    theme={ThemeButton.OUTLINE}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Войти')}
                </Button>
            </div>
        )
    }
)
