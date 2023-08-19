import { ProfileReducer } from 'entities/Profile'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const initialReducers: ReducerList = {
    profile: ProfileReducer,
}

const ProfilePage = memo(() => {
    const { t } = useTranslation('main')

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <div>{t('Страница профиля')}</div>
        </DynamicModuleLoader>
    )
})

export default ProfilePage
