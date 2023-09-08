import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RatingCardSchema } from '../types/RatingCardSchema';

const initialState: RatingCardSchema = {
    
};

export const RatingCardSlice = createSlice({
    name: 'RatingCard',
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

export const { actions: RatingCardActions } = RatingCardSlice;
export const { reducer: RatingCardReducer } = RatingCardSlice;