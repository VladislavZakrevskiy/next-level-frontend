import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'
import {
    getArticlePageInited,
} from '../../selectors/getArticlePage'
import { fetchArticleList } from '../fetchArticleList/fetchArticleList'
import { ArticlePageActions } from '../../slice/articlePageSlice'

export const initArticlesPage = createAsyncThunk<
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
    const _inited = getArticlePageInited(getState())
        if (!_inited) {
            dispatch(ArticlePageActions.initState())
            dispatch(
                fetchArticleList({
                    page: 1,
                })
            )
        }
    }
)
