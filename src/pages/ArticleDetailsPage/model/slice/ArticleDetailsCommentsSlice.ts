import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema'
import { Comment } from '@/entities/Comment'
import { StateSchema } from '@/app/providers/StoreProvider'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'

const commentsAdapter = createEntityAdapter<Comment>({
    selectId: (comment) => comment.id,
})

export const getArticleComments =
    commentsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.articleDetailsComments ||
            commentsAdapter.getInitialState()
    )

const ArticleDetailsCommentsSlice = createSlice({
    name: 'ArticleDetailsCommentsSlice',
    initialState:
        commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>(
            {
                ids: [],
                entities: {},
                error: undefined,
                isLoading: false,
            }
        ),
    reducers: {}, //fetchCommentsByArticleId
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchCommentsByArticleId.pending,
                (state) => {
                    state.isLoading = true
                    state.error = undefined
                }
            )
            .addCase(
                fetchCommentsByArticleId.fulfilled,
                (
                    state,
                    action: PayloadAction<Comment[]>
                ) => {
                    state.isLoading = false
                    commentsAdapter.setAll(
                        state,
                        action.payload
                    )
                }
            )
            .addCase(
                fetchCommentsByArticleId.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.error = action.payload
                }
            )
    },
})

export const {
    actions: ArticleDetailsCommentsActions,
    reducer: ArticleDetailsCommentsReducer,
} = ArticleDetailsCommentsSlice
