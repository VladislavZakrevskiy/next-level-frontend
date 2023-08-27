import {
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import { Article } from 'entities/Article'
import { ArticleDetailsPageRecommenedSchema } from '../types/ArticleDetailsPageRecommenedSchema'
import { StateSchema } from 'app/providers/StoreProvider'
import { fetchRecommendations } from '../services/fetchRecomendations/fetchRecomendations'

const recommendationsAdapter = createEntityAdapter<Article>(
    {
        selectId: (article) => article.id,
    }
)

export const recommendedSelectors =
    recommendationsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.articelDetailsRecommended ||
            recommendationsAdapter.getInitialState()
    )

const ArticleDetailsPageRecommenedSlice = createSlice({
    name: 'ArticleDetailsPageRecommenedSlice',
    initialState:
        recommendationsAdapter.getInitialState<ArticleDetailsPageRecommenedSchema>(
            {
                entities: {},
                ids: [],
            }
        ), //fetchRecommendations
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchRecommendations.pending,
                (state, action) => {
                    state.isLoading = true
                    state.error = undefined
                }
            )
            .addCase(
                fetchRecommendations.fulfilled,
                (
                    state,
                    action //: PayloadAction<Article[]>
                ) => {
                    state.isLoading = false
                    recommendationsAdapter.setAll(
                        state,
                        action.payload
                    )
                }
            )
            .addCase(
                fetchRecommendations.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.error = action.payload
                }
            )
    },
})

export const {
    actions: ArticleDetailsPageRecommenedActions,
    reducer: ArticleDetailsPageRecommenedReducer,
} = ArticleDetailsPageRecommenedSlice
