import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'
import { getArticlePageLimit } from '../../selectors/getArticlePage'

interface FetchArticleListProps {
    page?: number
}

export const fetchArticleList = createAsyncThunk<
    Article[],
    FetchArticleListProps,
    ThunkConfig<string>
>(
    'articlePage/fetchArticleList',
    async (
        {page = 1},
        { rejectWithValue, dispatch, getState, extra: { api } }
    ) => {
        const limit = getArticlePageLimit(getState())
        try {
            const response = await api.get<Article[]>(
                '/articles',
                {
                    params: { _expand: 'user', _limit: limit, _page: page },
                }
            )

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (err) {
            console.error(err)
            return rejectWithValue('error')
        }
    }
)
