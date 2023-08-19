import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema'
import { Profile } from '../../types/Profile'

export const fetchProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>(
    'profile/fetchProfileData',
    async (
        _,
        { rejectWithValue, dispatch, extra: { api } }
    ) => {
        try {
            const response = await api.get<Profile>(
                '/profile'
            )

            return response.data
        } catch (err) {
            console.error(err)
            return rejectWithValue('error')
        }
    }
)
