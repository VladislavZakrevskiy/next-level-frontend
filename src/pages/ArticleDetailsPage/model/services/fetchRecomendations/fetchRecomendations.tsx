import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article } from '@/entities/Article'
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams'

export const fetchRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articleDetailsPage/fetchRecommendations',
    async (
        _,
        {
            rejectWithValue,
            dispatch,
            getState,
            extra: { api },
        }
    ) => {
        try {
            const response = await api.get<Article[]>(
                '/articles',
                {
                    params: {
                        limit: 4,
                    },
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
