import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Profile } from '@/entities/Profile'

export const fetchProfileData = createAsyncThunk<
    Profile,
    string | undefined,
    ThunkConfig<string>
>(
    'profile/fetchProfileData',
    async (
        profileId,
        { rejectWithValue, dispatch, extra: { api } }
    ) => {
        try {
            const response = await api.get<Profile>(
                '/profile/' + profileId
            )

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (err) {
            console.error(err)
            return rejectWithValue('error')
        }
    }
)
