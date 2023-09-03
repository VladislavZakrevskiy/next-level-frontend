import { cn } from 'shared/lib/classNames'
import { FC } from 'react'
import classes from './CommentCard.module.scss'
import { Comment } from '../../model/types/comment'
import { Avatar } from 'shared/ui/Avatar'
import { Text } from 'shared/ui/Text'
import { Skeleton } from 'shared/ui/Skeleton'
import { AppLink } from 'shared/ui/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { HStack, VStack } from 'shared/ui/Stack'

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
            <VStack  max gap='8'
                className={cn(classes.CommentCard, {}, [
                    className, classes.loading
                ])}
            >
                <HStack  gap='8' align='center'>
                    <Skeleton
                        width={30}
                        border="50%"
                        height={30}
                    />
                    <Skeleton width={16} height={100} />
                </HStack>
                <Skeleton
                    width={'100%'}
                    height={50}
                />
            </VStack>
        )
    }

    if(!comment) return null

    return (
        <VStack max gap='8'
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
                text={comment.text}
            />
        </VStack>
    )
}
