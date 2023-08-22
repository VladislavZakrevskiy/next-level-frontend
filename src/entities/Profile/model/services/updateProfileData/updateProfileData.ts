import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    Profile,
    ValidateProfileError,
} from '../../types/Profile'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'
import { validateProfile } from '../validateProfile/validateProfile'

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
>(
    'profile/updateProfileData',
    async (
        _,
        { rejectWithValue, extra: { api }, getState }
    ) => {
        const form = getProfileForm(getState())
        const errors = validateProfile(form)

        if (errors.length) {
            return rejectWithValue(errors)
        }

        try {
            const response = await api.put<Profile>(
                '/profile',
                form
            )

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (err) {
            console.error(err)
            return rejectWithValue([
                ValidateProfileError.SERVER_ERROR,
            ])
        }
    }
)
