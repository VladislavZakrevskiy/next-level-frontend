import { cn } from 'shared/lib/classNames'
import { FC } from 'react'
import classes from './CommentCard.module.scss'
import { Comment } from '../../model/types/comment'
import { Avatar } from 'shared/ui/Avatar'
import { Text } from 'shared/ui/Text'
import { Skeleton } from 'shared/ui/Skeleton'

interface Props {
    className?: string
    comment: Comment
    isLoading?: boolean
}

export const CommentCard: FC<Props> = ({
    className,
    comment,
    isLoading,
}) => {
    if (isLoading) {
        ;<div
            className={cn(classes.CommentCard, {}, [
                className,
            ])}
        >
            <div className={classes.header}>
                <Skeleton
                    width={30}
                    border="50%"
                    height={30}
                />
                <Skeleton width={16} height={100} />
            </div>
            <Skeleton
                className={classes.text}
                width={'100%'}
                height={50}
            />
        </div>
    }

    return (
        <div
            className={cn(classes.CommentCard, {}, [
                className,
            ])}
        >
            <div className={classes.header}>
                {comment.user.avatar && (
                    <Avatar
                        src={comment.user.avatar}
                        alt={comment.user.username}
                        size={30}
                    />
                )}
                <Text title={comment.user.username} />
            </div>
            <Text
                className={classes.text}
                text={comment.text}
            />
        </div>
    )
}
