import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article, ArticleType } from '@/entities/Article'
import {
    getArticlePageLimit,
    getArticlePageNumber,
    getArticlePageOrder,
    getArticlePageSearch,
    getArticlePageSort,
    getArticlePageType,
} from '../../selectors/getArticlePage'
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams'

interface fetchArticleListProps {
    replace?: boolean
}

export const fetchArticleList = createAsyncThunk<
    Article[],
    fetchArticleListProps,
    ThunkConfig<string>
>(
    'articlePage/fetchArticleList',
    async (
        { replace },
        {
            rejectWithValue,
            dispatch,
            getState,
            extra: { api },
        }
    ) => {
        const limit = getArticlePageLimit(getState())
        const sort = getArticlePageSort(getState())
        const order = getArticlePageOrder(getState())
        const search = getArticlePageSearch(getState())
        const page = getArticlePageNumber(getState())
        const type = getArticlePageType(getState())
        try {
            const response = await api.get<Article[]>(
                '/articles',
                {
                    params: {
                        _expand: 'user',
                        _limit: limit,
                        _page: page,
                        _sort: sort,
                        _order: order,
                        q: search,
                        type:
                            type === ArticleType.ALL
                                ? undefined
                                : type,
                    },
                }
            )

            if (!response.data) {
                throw new Error()
            }

            addQueryParams({ search, order, sort, type })
            return response.data
        } catch (err) {
            console.error(err)
            return rejectWithValue('error')
        }
    }
)
