import {
    PayloadAction,
    createSlice,
} from '@reduxjs/toolkit'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import { editableProfileSchema } from '../types/editableProfileSchema'
import { Profile } from 'entities/Profile'

const initialState: editableProfileSchema = {
    readonly: true,
    isLoading: false,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.readonly = action.payload
        },
        cancelEdit: (state) => {
            state.readonly = true
            state.form = state.data
            state.validateError = undefined
        },
        updateProfile: (
            state,
            action: PayloadAction<Profile>
        ) => {
            state.form = {
                ...state.form,
                ...action.payload,
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(
                fetchProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false
                    state.data = action.payload
                    state.form = action.payload
                }
            )
            .addCase(
                fetchProfileData.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.error = action.payload
                }
            )
            .addCase(updateProfileData.pending, (state) => {
                state.isLoading = true
                state.validateError = undefined
            })
            .addCase(
                updateProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false
                    state.data = action.payload
                    state.form = action.payload
                    state.readonly = true
                    state.validateError = undefined
                }
            )
            .addCase(
                updateProfileData.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.validateError = action.payload
                }
            )
    },
})

export const {
    actions: ProfileActions,
    reducer: ProfileReducer,
} = profileSlice
