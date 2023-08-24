import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Comment } from 'entities/Comment'
import {
    getUserAuthData,
} from 'entities/User'
import { getCommentFormText } from '../../selectors/getFormComment'
import { getArticleDetailsData } from 'entities/Article/model/selectors/ArticleDetails'
import { AddCommentFormActions } from '../../slice/addCommentFormSlice'
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById'

export const sendComment = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>(
    'addFormComment/sendComment',
    async (
        text,
        {
            rejectWithValue,
            getState,
            dispatch,
            extra: { api },
        }
    ) => {
        const userData = getUserAuthData(getState())
        const article = getArticleDetailsData(getState())

        if (!userData || !text || !article) {
            return rejectWithValue('no data')
        }

        try {
            const response = await api.post<Comment>(
                '/comment',
                {
                    articleId: article.id,
                    userId: userData.id,
                    text,
                }
            )

            if (!response.data) {
                throw new Error()
            }

            dispatch(fetchArticleById(article.id))
            return response.data
        } catch (err) {
            console.error(err)
            return rejectWithValue('error')
        }
    }
)
