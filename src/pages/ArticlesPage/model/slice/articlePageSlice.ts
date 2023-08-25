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
            }
        ),
    reducers: {
        setView: (
            state,
            action: PayloadAction<ArticleView>
        ) => {
            state.view = action.payload
            localStorage.setItem(
                ARTICLE_VIEW_LOCAL_STORAGE_KEY,
                action.payload
            )
        },
        initState: (state) => {
            state.view = localStorage.getItem(
                ARTICLE_VIEW_LOCAL_STORAGE_KEY
            ) as ArticleView
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
                    articlePageAdapter.setAll(
                        state,
                        action.payload
                    )
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
