import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from '../../types/article'

export const fetchArticleById = createAsyncThunk<
    Article,
    string,
    ThunkConfig<string>
>(
    'articleDetails/fetchArticleById',
    async (
        articleId,
        { rejectWithValue, dispatch, extra: { api } }
    ) => {
        try {
            const response = await api.get<Article>(
                '/articles/' + articleId,
                { params: { _expand: 'user' } }
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
