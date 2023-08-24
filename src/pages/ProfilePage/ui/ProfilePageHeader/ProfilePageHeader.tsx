import { cn } from 'shared/lib/classNames'
import { FC, useCallback } from 'react'
import classes from './ProfilePageHeader.module.scss'
import { Text } from 'shared/ui/Text'
import { Button, ThemeButton } from 'shared/ui/Button'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
    ProfileActions,
    getProfileData,
    getProfileReadonly,
    updateProfileData,
} from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getUserAuthData } from 'entities/User'
import { useParams } from 'react-router-dom'

interface Props {
    className?: string
}

export const ProfilePageHeader: FC<Props> = ({
    className,
}) => {
    const { t } = useTranslation('profile')
    const readonly = useSelector(getProfileReadonly)
    const dispatch = useAppDispatch()
    const authData = useSelector(getUserAuthData)
    const profileData = useSelector(getProfileData)
    const canEdit = authData?.id === profileData?.id

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
            {canEdit && (
                <div className={classes.btnWrapper}>
                    {readonly ? (
                        <Button
                            onClick={onEdit}
                            theme={ThemeButton.OUTLINE}
                        >
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={onCancelEdit}
                                theme={
                                    ThemeButton.OUTLINE_RED
                                }
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                onClick={onSave}
                                className={cn(
                                    classes.saveBtn
                                )}
                                theme={ThemeButton.OUTLINE}
                            >
                                {t('Подтвердить')}
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
