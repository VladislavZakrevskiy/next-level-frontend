import {
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'
import { Article, ArticleSortField, ArticleType, ArticleView } from '@/entities/Article'
import { ArticlePageSchema } from '../types/articlePageSchema'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchArticleList } from '../services/fetchArticleList/fetchArticleList'
import { ARTICLE_VIEW_LOCAL_STORAGE_KEY } from '@/shared/consts/localStorage'
import { SortOrder } from '@/shared/types'

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
                limit: 10,
                hasMore: true,
                page: 1,
                _inited: false,

                order: 'asc',
                search: '',
                sort: ArticleSortField.CREATED,
                type: ArticleType.ALL
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
            state.limit = view === ArticleView.BIG ? 4 : 9
        },

        setOrder: (
            state,
            action: PayloadAction<SortOrder>
        ) => {
            state.order = action.payload
        },

        setSort: (
            state,
            action: PayloadAction<ArticleSortField>
        ) => {
            state.sort = action.payload
        },

        setSearch: (
            state,
            action: PayloadAction<string>
        ) => {
            state.search = action.payload
        },

        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchArticleList.pending,
                (state, action) => {
                    state.isLoading = true
                    state.error = undefined

                    if (action.meta.arg.replace) {
                        articlePageAdapter.removeAll(state)
                    }
                }
            )
            .addCase(
                fetchArticleList.fulfilled,
                (
                    state,
                    action //: PayloadAction<Article[]>
                ) => {
                    state.isLoading = false

                    state.hasMore =
                        action.payload.length > state.limit
                    if (action.meta.arg.replace) {
                        articlePageAdapter.setAll(
                            state,
                            action.payload
                        )
                    } else {
                        articlePageAdapter.addMany(
                            state,
                            action.payload
                        )
                    }
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
