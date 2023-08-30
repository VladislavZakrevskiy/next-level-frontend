import { Mods, cn } from 'shared/lib/classNames'
import { FC } from 'react'
import classes from './ProfileCard.module.scss'
import { useTranslation } from 'react-i18next'
import { Text, TextAlign, TextTheme } from 'shared/ui/Text'
import { Input } from 'shared/ui/Input'
import { Profile } from 'entities/Profile/model/types/Profile'
import { Loader } from 'shared/ui/Loader'
import { Avatar } from 'shared/ui/Avatar'
import { Select } from 'shared/ui/Select'
import { Currency, CurrencySelect } from 'entities/Currency'
import { Country, CountrySelect } from 'entities/Country'
import { HStack, VStack } from 'shared/ui/Stack'

interface Props {
    className?: string
    data?: Profile
    isLoading?: boolean
    error?: string
    readonly?: boolean
    onChangeFirstname?: (value?: string) => void
    onChangeLastname?: (value?: string) => void
    onChangeAge?: (value?: string) => void
    onChangeCity?: (value?: string) => void
    onChangeUsername?: (value?: string) => void
    onChangeAvatar?: (value?: string) => void
    onChangeCurrency?: (currency: Currency) => void
    onChangeCountry?: (country: Country) => void
}

export const ProfileCard: FC<Props> = ({
    className,
    data,
    error,
    isLoading,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,
}) => {
    const { t } = useTranslation('profile')

    if (isLoading) {
        return (
            <HStack
                justify="center"
                className={cn(classes.ProfileCard, {}, [
                    className,
                    classes.loading,
                ])}
            >
                <Loader />
            </HStack>
        )
    }

    if (error) {
        return (
            <HStack
                justify="center"
                className={cn(classes.ProfileCard, {}, [
                    className,
                    classes.error,
                ])}
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t(
                        'Произошла ошибка при загрузке страницы'
                    )}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </HStack>
        )
    }

    const mods: Mods = {
        [classes.editing]: !readonly,
    }

    return (
        <VStack
            gap="8"
            max
            className={cn(classes.ProfileCard, mods, [
                className,
            ])}
        >
            {data?.avatar && (
                <HStack justify="center" max>
                    <Avatar
                        src={data?.avatar}
                        alt="Avatar"
                    />
                </HStack>
            )}
            <Input
                value={data?.first}
                placeholder={t('Ваше имя')}
                onChange={onChangeFirstname}
                readOnly={readonly}
            />
            <Input
                value={data?.lastname}
                placeholder={t('Ваша фамилия')}
                onChange={onChangeLastname}
                readOnly={readonly}
            />
            <Input
                value={data?.age}
                placeholder={t('Ваше возраст')}
                onChange={onChangeAge}
                readOnly={readonly}
            />
            <Input
                value={data?.city}
                placeholder={t('Город')}
                onChange={onChangeCity}
                readOnly={readonly}
            />
            <Input
                value={data?.username}
                placeholder={t('Имя пользователея')}
                onChange={onChangeUsername}
                readOnly={readonly}
            />
            <Input
                value={data?.avatar}
                placeholder={t('Ссылка на аватар')}
                onChange={onChangeAvatar}
                readOnly={readonly}
            />
            <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                readOnly={readonly}
            />
            <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                readOnly={readonly}
            />
        </VStack>
    )
}
