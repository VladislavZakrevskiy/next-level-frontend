import { cn } from 'shared/lib/classNames'
import { FC, memo } from 'react'
import classes from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { ArticleDetails } from 'entities/Article'
import { useParams } from 'react-router-dom'
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
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

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
    const comments = useSelector(
        getArticleComments.selectAll
    )
    const isLoading = useSelector(
        getArticleCommentsIsLoading
    )
    const error = useSelector(getArticleCommentsError)

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

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
                <ArticleDetails id={id} />
                <Text
                    className={classes.commentTitle}
                    title={t('Комментарии')}
                />
                <CommentList isLoading={isLoading} comments={comments} />
            </div>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)
