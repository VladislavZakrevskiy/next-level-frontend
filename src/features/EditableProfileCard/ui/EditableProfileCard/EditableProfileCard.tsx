import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { Text, TextTheme } from '@/shared/ui/Text'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/UseInitialEffect'
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm'
import { ProfileCard } from '@/entities/Profile'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError'
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { getProfileValidateError } from '../../model/selectors/getProfileValidateError/getProfileValidateError'
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import {
    ProfileActions,
    ProfileReducer,
} from '../../model/slice/profileSlice'
import { cn } from '@/shared/lib/classNames'
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader'
import { VStack } from '@/shared/ui/Stack'

interface EditableProfileCardProps {
    className?: string
    id?: string
}

const initialReducers: ReducerList = {
    profile: ProfileReducer,
}

export const EditableProfileCard = memo(
    (props: EditableProfileCardProps) => {
        const { className, id } = props
        const { t } = useTranslation('profile')
        const dispatch = useAppDispatch()
        const form = useSelector(getProfileForm)
        const error = useSelector(getProfileError)
        const isLoading = useSelector(getProfileIsLoading)
        const readonly = useSelector(getProfileReadonly)
        const validateErrors = useSelector(
            getProfileValidateError
        )

        useInitialEffect(() => {
            if (id) {
                dispatch(fetchProfileData(id))
            }
        })

        const onChangeFirstname = useCallback(
            (value?: string) => {
                dispatch(
                    ProfileActions.updateProfile({
                        first: value || '',
                    })
                )
            },
            [dispatch]
        )

        const onChangeLastname = useCallback(
            (value?: string) => {
                dispatch(
                    ProfileActions.updateProfile({
                        lastname: value || '',
                    })
                )
            },
            [dispatch]
        )

        const onChangeAge = useCallback(
            (value?: string) => {
                const reg = /^\d+$/
                if (reg.test(value || '')) {
                    dispatch(
                        ProfileActions.updateProfile({
                            age: Number(value) || 0,
                        })
                    )
                }
            },
            [dispatch]
        )

        const onChangeCity = useCallback(
            (value?: string) => {
                dispatch(
                    ProfileActions.updateProfile({
                        city: value || '',
                    })
                )
            },
            [dispatch]
        )

        const onChangeUsername = useCallback(
            (value?: string) => {
                dispatch(
                    ProfileActions.updateProfile({
                        username: value || '',
                    })
                )
            },
            [dispatch]
        )

        const onChangeAvatar = useCallback(
            (value?: string) => {
                dispatch(
                    ProfileActions.updateProfile({
                        avatar: value || '',
                    })
                )
            },
            [dispatch]
        )

        const onChangeCurrency = useCallback(
            (value?: Currency) => {
                dispatch(
                    ProfileActions.updateProfile({
                        currency: value,
                    })
                )
            },
            [dispatch]
        )

        const onChangeCountry = useCallback(
            (value?: Country) => {
                dispatch(
                    ProfileActions.updateProfile({
                        country: value,
                    })
                )
            },
            [dispatch]
        )

        return (
            <DynamicModuleLoader reducers={initialReducers}>
                <VStack
                    gap="8"
                    max
                    className={cn('', {}, [className])}
                >
                    <EditableProfileCardHeader />
                    {validateErrors?.length &&
                        validateErrors.map((err) => (
                            <Text
                                key={err}
                                theme={TextTheme.ERROR}
                                text={t(err)}
                                data-testid={'EditableProfileCard.Error'}
                            />
                        ))}
                    <ProfileCard
                        data={form}
                        isLoading={isLoading}
                        error={error}
                        onChangeFirstname={
                            onChangeFirstname
                        }
                        onChangeLastname={onChangeLastname}
                        onChangeAge={onChangeAge}
                        onChangeCity={onChangeCity}
                        onChangeUsername={onChangeUsername}
                        onChangeAvatar={onChangeAvatar}
                        onChangeCurrency={onChangeCurrency}
                        onChangeCountry={onChangeCountry}
                        readonly={readonly}
                    />
                </VStack>
            </DynamicModuleLoader>
        )
    }
)
