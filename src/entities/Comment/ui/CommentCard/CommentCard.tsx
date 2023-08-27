import { cn } from 'shared/lib/classNames'
import { FC } from 'react'
import classes from './CommentCard.module.scss'
import { Comment } from '../../model/types/comment'
import { Avatar } from 'shared/ui/Avatar'
import { Text } from 'shared/ui/Text'
import { Skeleton } from 'shared/ui/Skeleton'
import { AppLink } from 'shared/ui/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

interface Props {
    className?: string
    comment?: Comment
    isLoading?: boolean
}

export const CommentCard: FC<Props> = ({
    className,
    comment,
    isLoading,
}) => {
    if (isLoading) {
        return (
            <div
                className={cn(classes.CommentCard, {}, [
                    className, classes.loading
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
        )
    }

    if(!comment) return null

    return (
        <div
            className={cn(classes.CommentCard, {}, [
                className,
            ])}
        >
            <AppLink
                to={RoutePath.profile + comment.user.id}
                className={classes.header}
            >
                {comment.user.avatar && (
                    <Avatar
                        src={comment.user.avatar}
                        alt={comment.user.username}
                        size={30}
                    />
                )}
                <Text title={comment.user.username} />
            </AppLink>
            <Text
                className={classes.text}
                text={comment.text}
            />
        </div>
    )
}
