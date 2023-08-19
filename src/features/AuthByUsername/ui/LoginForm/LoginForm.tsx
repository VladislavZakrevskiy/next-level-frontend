import { cn } from 'shared/lib/classNames'
import { FC, memo, useCallback } from 'react'
import classes from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button'
import { Input } from 'shared/ui/Input'
import { useSelector } from 'react-redux'
import {
    AuthActions,
    loginByUsername,
} from 'features/AuthByUsername'
import { Text, TextTheme } from 'shared/ui/Text'
import { AuthReducer } from '../../model/slice/authSlice'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface Props {
    className?: string
    onSuccess?: () => void
}

const initialReducers: ReducerList = {
    login: AuthReducer,
}

const LoginForm: FC<Props> = memo(
    ({ className, onSuccess }) => {
        const { t } = useTranslation()
        const password = useSelector(getLoginPassword)
        const username = useSelector(getLoginUsername)
        const isLoading = useSelector(getLoginIsLoading)
        const error = useSelector(getLoginError)
        const dispatch = useAppDispatch()

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

        const onLoginClick = useCallback(async () => {
            const result = await dispatch(
                loginByUsername({ username, password })
            )

            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess?.()
            }
        }, [onSuccess, dispatch, username, password])

        return (
            <DynamicModuleLoader reducers={initialReducers}>
                <div
                    className={cn(classes.LoginForm, {}, [
                        className,
                    ])}
                >
                    <Text title={t('Форма авторизации')} />
                    {error && (
                        <Text
                            text={t(
                                'Вы ввели неверный логин или пароль'
                            )}
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
            </DynamicModuleLoader>
        )
    }
)

export default LoginForm
