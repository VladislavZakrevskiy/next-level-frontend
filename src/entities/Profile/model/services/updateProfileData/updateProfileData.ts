import { createAsyncThunk } from '@reduxjs/toolkit'
import { Profile } from '../../types/Profile'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>(
    'profile/updateProfileData',
    async (
        _,
        {
            rejectWithValue,
            dispatch,
            extra: { api },
            getState,
        }
    ) => {
        const form = getProfileForm(getState())

        try {
            const response = await api.put<Profile>(
                '/profile',
                form
            )

            return response.data
        } catch (err) {
            console.error(err)
            return rejectWithValue('error')
        }
    }
)
