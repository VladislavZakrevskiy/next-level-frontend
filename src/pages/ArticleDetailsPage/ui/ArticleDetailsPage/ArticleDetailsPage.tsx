import { cn } from 'shared/lib/classNames'
import { FC, memo, useCallback } from 'react'
import classes from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import {
    ArticleDetails,
    ArticleList,
    ArticleView,
} from 'entities/Article'
import { useNavigate, useParams } from 'react-router-dom'
import { Text, TextSize } from 'shared/ui/Text'
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
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/UseInitialEffect'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { LazyAddCommentForm } from 'features/addCommentForm'
import { sendComment } from 'features/addCommentForm/model/services/sendComment/sendComment'
import { getCommentFormText } from 'features/addCommentForm/model/selectors/getFormComment'
import { Button } from 'shared/ui/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Page } from 'widgets/Page'
import {
    ArticleDetailsPageRecommenedReducer,
    recommendedSelectors,
} from '../../model/slice/ArticleDetailsPageRecommenedSlice'
import {
    getArticleDetailsRecommendedError,
    getArticleDetailsRecommendedIsLoading,
} from '../../model/selectors/recommended'
import { fetchRecommendations } from '../../model/services/fetchRecomendations/fetchRecomendations'
import { ArticleDetailsHeader } from '../ArticleDetailsHeader/ArticleDetailsHeader.module.scss'

interface Props {
    className?: string
}

const reducers: ReducerList = {
    articleDetailsComments: ArticleDetailsCommentsReducer,
    articelDetailsRecommended:
        ArticleDetailsPageRecommenedReducer,
}

const ArticleDetailsPage: FC<Props> = ({ className }) => {
    const { t } = useTranslation('acticle')
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()

    const comments = useSelector(
        getArticleComments.selectAll
    )
    const recommendations = useSelector(
        recommendedSelectors.selectAll
    )
    const recommendedIsLoading = useSelector(
        getArticleDetailsRecommendedIsLoading
    )
    const recommendedError = useSelector(
        getArticleDetailsRecommendedError
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
        dispatch(fetchRecommendations())
    })

    if (!id) {
        return (
            <Page
                className={cn(
                    classes.ArticleDetailsPage,
                    {},
                    [className]
                )}
            >
                {t('Статья не найдена')}
            </Page>
        )
    }
    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <Page
                className={cn(
                    classes.ArticleDetailsPage,
                    {},
                    [className]
                )}
            >
                <ArticleDetailsHeader/>
                <ArticleDetails id={id} />
                <Text
                    size={TextSize.L}
                    className={classes.commentTitle}
                    title={t('Рекшомендуем')}
                />
                <ArticleList
                    articles={recommendations}
                    view={ArticleView.SMALL}
                    isLoading={recommendedIsLoading}
                    className={classes.recomendations}
                />
                <Text
                    size={TextSize.L}
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
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)
