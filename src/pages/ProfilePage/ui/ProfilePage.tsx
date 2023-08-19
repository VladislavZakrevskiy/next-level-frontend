import { ProfileCard, ProfileReducer, fetchProfileData } from 'entities/Profile'
import React, { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

const initialReducers: ReducerList = {
    profile: ProfileReducer,
}

const ProfilePage = memo(() => {
    const { t } = useTranslation('main')
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <ProfileCard/>
        </DynamicModuleLoader>
    )
})

export default ProfilePage
