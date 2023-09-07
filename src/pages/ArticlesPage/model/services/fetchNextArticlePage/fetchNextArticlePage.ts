import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article } from '@/entities/Article'
import {
    getArticlePageHasMore,
    getArticlePageIsLoading,
    getArticlePageNumber,
} from '../../selectors/getArticlePage'
import { fetchArticleList } from '../fetchArticleList/fetchArticleList'
import { ArticlePageActions } from '../../slice/articlePageSlice'

export const fetchNextArticlePage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlePage/fetchNextArticlePage',
    async (
        _,
        {
            rejectWithValue,
            dispatch,
            getState,
            extra: { api },
        }
    ) => {
        const page = getArticlePageNumber(getState()) || 1
        const hasMore = getArticlePageHasMore(getState())
        const isLoading = getArticlePageIsLoading(
            getState()
        )

        if (hasMore && !isLoading) {
            dispatch(ArticlePageActions.setPage(page + 1))
            dispatch(
                fetchArticleList({})
            )
        }
    }
)
