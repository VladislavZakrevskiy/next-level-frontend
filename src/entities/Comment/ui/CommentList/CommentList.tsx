import { cn } from 'shared/lib/classNames'
import { FC } from 'react'
import classes from './CommentList.module.scss'
import { Comment } from '../../model/types/comment'
import { Text } from 'shared/ui/Text'
import { useTranslation } from 'react-i18next'
import { CommentCard } from '../CommentCard/CommentCard'
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
            <div className={cn('', {}, [className])}>
                <CommentCard
                    isLoading
                    className={classes.comment}
                />
                <CommentCard
                    isLoading
                    className={classes.comment}
                />
                <CommentCard
                    isLoading
                    className={classes.comment}
                />
            </div>
        )
    }

    return (
        <div className={cn('', {}, [className])}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        isLoading={isLoading}
                        className={classes.comment}
                        comment={comment}
                        key={comment.id}
                    />
                ))
            ) : (
                <Text text={t('Комментарии отсутствуют')} />
            )}
        </div>
    )
}
