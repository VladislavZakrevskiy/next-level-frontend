import { cn } from 'shared/lib/classNames'
import { FC, memo, useCallback } from 'react'
import classes from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { ArticleDetails } from 'entities/Article'
import { useNavigate, useParams } from 'react-router-dom'
import { Text } from 'shared/ui/Text'
import { CommentList } from 'entities/Comment'
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
    ArticleDetailsCommentsReducer,
    getArticleComments,
} from '../../model/slice/ArticleDetailsCommentsSlice'
import { useSelector } from 'react-redux'
import {
    getArticleCommentsError,
    getArticleCommentsIsLoading,
} from 'pages/ArticleDetailsPage/model/selectors/comments'
import { useInitialEffect } from 'shared/lib/hooks/UseInitialEffect/UseInitialEffect'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { LazyAddCommentForm } from 'features/addCommentForm'
import { sendComment } from 'features/addCommentForm/model/services/sendComment/sendComment'
import { getCommentFormText } from 'features/addCommentForm/model/selectors/getFormComment'
import { Button } from 'shared/ui/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

interface Props {
    className?: string
}

const reducers: ReducerList = {
    articleDetailsComments: ArticleDetailsCommentsReducer,
}

const ArticleDetailsPage: FC<Props> = ({ className }) => {
    const { t } = useTranslation('acticle')
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const comments = useSelector(
        getArticleComments.selectAll
    )
    const isLoading = useSelector(
        getArticleCommentsIsLoading
    )
    const error = useSelector(getArticleCommentsError)

    const onSendComment = useCallback((text: string) => {
        dispatch(sendComment(text))
    }, [])

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    const onBackToList = useCallback(() => {
        nav(RoutePath.acticles)
    }, [nav])

    if (!id) {
        return (
            <div
                className={cn(
                    classes.ArticleDetailsPage,
                    {},
                    [className]
                )}
            >
                {t('Статья не найдена')}
            </div>
        )
    }
    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <div
                className={cn(
                    classes.ArticleDetailsPage,
                    {},
                    [className]
                )}
            >
                <Button onClick={onBackToList}>{t('Назад к списку')}</Button>
                <ArticleDetails id={id} />
                <Text
                    className={classes.commentTitle}
                    title={t('Комментарии')}
                />
                <LazyAddCommentForm
                    onSendComment={onSendComment}
                />
                <CommentList
                    isLoading={isLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)
