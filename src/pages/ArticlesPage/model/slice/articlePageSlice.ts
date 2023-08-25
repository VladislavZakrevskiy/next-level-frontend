import {
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { Article, ArticleView } from 'entities/Article'
import { ArticlePageSchema } from '../types/articlePageSchema'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchArticleList } from '../services/fetchArticleList/fetchArticleList'
import { ARTICLE_VIEW_LOCAL_STORAGE_KEY } from 'shared/consts/localStorage'

const articlePageAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
})

export const articlePageSelectors =
    articlePageAdapter.getSelectors<StateSchema>(
        (state) =>
            state.articlePage ||
            articlePageAdapter.getInitialState()
    )

const articlePageSlice = createSlice({
    name: 'articlePage',
    initialState:
        articlePageAdapter.getInitialState<ArticlePageSchema>(
            {
                entities: {},
                ids: [],
                view: ArticleView.SMALL,
                hasMore: true,
                page: 1,
            }
        ),
    reducers: {
        setView: (
            state,
            action: PayloadAction<ArticleView>
        ) => {
            state.view = action.payload
        },

        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },

        setLimit: (
            state,
            action: PayloadAction<number>
        ) => {
            state.limit = action.payload
        },

        setHasMore: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.hasMore = action.payload
        },

        initState: (state) => {
            const view = localStorage.getItem(
                ARTICLE_VIEW_LOCAL_STORAGE_KEY
            ) as ArticleView
            state.view = view
            state.limit = (view === ArticleView.BIG ? 4 : 9)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleList.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(
                fetchArticleList.fulfilled,
                (
                    state,
                    action: PayloadAction<Article[]>
                ) => {
                    state.isLoading = false
                    articlePageAdapter.addMany(
                        state,
                        action.payload
                    )
                    state.hasMore = action.payload.length > 0
                }
            )
            .addCase(
                fetchArticleList.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.error = action.payload
                }
            )
    },
})

export const {
    actions: ArticlePageActions,
    reducer: ArticlePageReducer,
} = articlePageSlice
