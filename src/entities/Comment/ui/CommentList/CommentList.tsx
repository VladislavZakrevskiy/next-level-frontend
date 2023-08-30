import { cn } from 'shared/lib/classNames'
import { FC } from 'react'
import classes from './CommentList.module.scss'
import { Comment } from '../../model/types/comment'
import { Text } from 'shared/ui/Text'
import { useTranslation } from 'react-i18next'
import { CommentCard } from '../CommentCard/CommentCard'
import { VStack } from 'shared/ui/Stack'
interface Props {
    className?: string
    comments?: Comment[]
    isLoading?: boolean
}

export const CommentList: FC<Props> = ({
    className,
    comments,
    isLoading,
}) => {
    const { t } = useTranslation()

    if (isLoading) {
        return (
            <VStack gap='16' max className={cn('', {}, [className])}>
                <CommentCard
                    isLoading
                />
                <CommentCard
                    isLoading
                />
                <CommentCard
                    isLoading
                />
            </VStack>
        )
    }

    return (
        <VStack gap='16' max className={cn('', {}, [className])}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        isLoading={isLoading}
                        comment={comment}
                        key={comment.id}
                    />
                ))
            ) : (
                <Text text={t('Комментарии отсутствуют')} />
            )}
        </VStack>
    )
}
