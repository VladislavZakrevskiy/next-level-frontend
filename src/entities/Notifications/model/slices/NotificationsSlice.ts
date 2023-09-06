import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationsSchema } from '../types/NotificationsSchema';

const initialState: NotificationsSchema = {
    
};

export const NotificationsSlice = createSlice({
    name: 'Notifications',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {
           
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: NotificationsActions } = NotificationsSlice;
export const { reducer: NotificationsReducer } = NotificationsSlice;