import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article } from '@/entities/Article'
import { getArticlePageInited } from '../../selectors/getArticlePage'
import { fetchArticleList } from '../fetchArticleList/fetchArticleList'
import { ArticlePageActions } from '../../slice/articlePageSlice'
import {
    ArticleSortField,
    ArticleType,
} from '@/entities/Article/model/types/article'
import { SortOrder } from '@/shared/types'

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    'articlePage/fetchNextArticlePage',
    async (
        searchParams,
        {
            rejectWithValue,
            dispatch,
            getState,
            extra: { api },
        }
    ) => {
        const _inited = getArticlePageInited(getState())
        if (!_inited) {
            const order = searchParams.get('order')
            const sort = searchParams.get('sort')
            const search = searchParams.get('search')
            const type = searchParams.get('type')

            if (order) {
                dispatch(
                    ArticlePageActions.setOrder(
                        order as SortOrder
                    )
                )
            }
            if (sort) {
                dispatch(
                    ArticlePageActions.setSort(
                        sort as ArticleSortField
                    )
                )
            }
            if (search) {
                dispatch(
                    ArticlePageActions.setSearch(search)
                )
            }

            if (type) {
                dispatch(
                    ArticlePageActions.setType(
                        type as ArticleType
                    )
                )
            }

            dispatch(ArticlePageActions.initState())
            dispatch(fetchArticleList({}))
        }
    }
)
