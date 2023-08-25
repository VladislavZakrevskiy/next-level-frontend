import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'

export const fetchArticleList = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articlePage/fetchArticleList',
    async (
        _,
        { rejectWithValue, dispatch, extra: { api } }
    ) => {
        try {
            const response = await api.get<Article[]>(
                '/articles',
                {
                    params: { _expand: 'user' },
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
