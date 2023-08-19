import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Profile, ProfileSchema } from '../types/Profile'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: true
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = true
                state.data = action.payload
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = true
                state.error = action.payload
            })
    },
})

export const {
    actions: ProfileActions,
    reducer: ProfileReducer,
} = profileSlice
