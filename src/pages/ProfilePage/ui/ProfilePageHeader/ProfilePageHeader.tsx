import { cn } from 'shared/lib/classNames'
import { FC, useCallback } from 'react'
import classes from './ProfilePageHeader.module.scss'
import { Text } from 'shared/ui/Text'
import { Button, ThemeButton } from 'shared/ui/Button'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
    ProfileActions,
    getProfileReadonly,
    updateProfileData,
} from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface Props {
    className?: string
}

export const ProfilePageHeader: FC<Props> = ({
    className,
}) => {
    const { t } = useTranslation('profile')
    const readonly = useSelector(getProfileReadonly)
    const dispatch = useAppDispatch()

    const onEdit = useCallback(() => {
        dispatch(ProfileActions.setReadonly(false))
    }, [dispatch])

    const onCancelEdit = useCallback(() => {
        dispatch(ProfileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(() => {
        dispatch(updateProfileData())
    }, [dispatch])

    return (
        <div
            className={cn(classes.ProfilePageHeader, {}, [
                className,
            ])}
        >
            <Text title={t('Профиль')} />
            {readonly ? (
                <Button
                    onClick={onEdit}
                    className={cn(classes.editBtn)}
                    theme={ThemeButton.OUTLINE}
                >
                    {t('Редактировать')}
                </Button>
            ) : (
                <>
                    <Button
                        onClick={onCancelEdit}
                        className={cn(classes.editBtn)}
                        theme={ThemeButton.OUTLINE_RED}
                    >
                        {t('Отменить')}
                    </Button>
                    <Button
                        onClick={onSave}
                        className={cn(classes.saveBtn)}
                        theme={ThemeButton.OUTLINE}
                    >
                        {t('Подтвердить')}
                    </Button>
                </>
            )}
        </div>
    )
}
