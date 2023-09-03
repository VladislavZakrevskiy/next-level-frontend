import { cn } from 'shared/lib/classNames'
import { FC, useCallback } from 'react'
import { Text, TextSize } from 'shared/ui/Text'
import { LazyAddCommentForm } from 'features/addCommentForm'
import { CommentList } from 'entities/Comment'
import { getArticleComments } from 'pages/ArticleDetailsPage/model/slice/ArticleDetailsCommentsSlice'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { sendComment } from 'features/addCommentForm/model/services/sendComment/sendComment'
import { getArticleCommentsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/comments'
import { useTranslation } from 'react-i18next'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/UseInitialEffect'
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { VStack } from 'shared/ui/Stack'

interface Props {
    className?: string
    id: string
}

export const ArticleDetailsComments: FC<Props> = ({
    className,
    id,
}) => {
    const { t } = useTranslation('acticle')
    const dispatch = useAppDispatch()
    const comments = useSelector(
        getArticleComments.selectAll
    )
    const isLoading = useSelector(
        getArticleCommentsIsLoading
    )

    const onSendComment = useCallback((text: string) => {
        dispatch(sendComment(text))
    }, [])

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    return (
        <VStack max gap='16' className={cn('', {}, [className])}>
            <Text
                size={TextSize.L}
                title={t('Комментарии')}
            />
            <LazyAddCommentForm
                onSendComment={onSendComment}
            />
            <CommentList
                isLoading={isLoading}
                comments={comments}
            />
        </VStack>
    )
}
