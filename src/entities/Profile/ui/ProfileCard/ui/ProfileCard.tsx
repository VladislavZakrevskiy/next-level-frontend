import { cn } from 'shared/lib/classNames'
import { FC } from 'react'
import classes from './ProfileCard.module.scss'
import { useSelector } from 'react-redux'
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData'
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text'
import { Button, ThemeButton } from 'shared/ui/Button'
import { Input } from 'shared/ui/Input'

interface Props {
    className?: string
}

export const ProfileCard: FC<Props> = ({ className }) => {
    const { t } = useTranslation('profile')
    const data = useSelector(getProfileData)
    const error = useSelector(getProfileError)
    const isLoading = useSelector(getProfileIsLoading)

    return (
        <div
            className={cn(classes.ProfileCard, {}, [
                className,
            ])}
        >
            <div className={classes.header}>
                <Text title={t('Профиль')} />
                <Button
                    className={cn(classes.editBtn)}
                    theme={ThemeButton.OUTLINE}
                >
                    {t('Редактировать')}
                </Button>
            </div>
            <div className={classes.data}>
                <Input
                    value={data?.first}
                    placeholder={t('Ваше имя')}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Ваша фамилия')}
                />
            </div>
        </div>
    )
}
