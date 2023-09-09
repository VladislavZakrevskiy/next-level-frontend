import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleRatingSchema } from '../types/ArticleRatingSchema';

const initialState: ArticleRatingSchema = {
    
};

export const ArticleRatingSlice = createSlice({
    name: 'ArticleRating',
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

export const { actions: ArticleRatingActions } = ArticleRatingSlice;
export const { reducer: ArticleRatingReducer } = ArticleRatingSlice;