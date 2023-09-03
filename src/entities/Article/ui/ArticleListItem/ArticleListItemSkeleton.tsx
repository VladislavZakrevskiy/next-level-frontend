import { cn } from 'shared/lib/classNames'
import { FC } from 'react'
import classes from './ArticleListItem.module.scss'
import { Card } from 'shared/ui/Card'
import { Skeleton } from 'shared/ui/Skeleton'
import { ArticleView } from 'entities/Article/model/consts/consts'

interface Props {
    className?: string
    view: ArticleView
}

export const ArticleListItemSkeleton: FC<Props> = ({
    className,
    view,
}) => {
    if (view === ArticleView.SMALL) {
        return (
            <div
                className={cn('', {}, [
                    className,
                    classes[view],
                ])}
            >
                <Card>
                    <div className={classes.imageWrapper}>
                        <Skeleton
                            width={200}
                            height={200}
                            className={classes.img}
                        />
                    </div>
                    <div className={classes.infoWrapper}>
                        <Skeleton width={130} height={16} />
                        <Skeleton width={130} height={16} />
                    </div>
                    <Skeleton width={150} height={16} />
                </Card>
            </div>
        )
    }

    return (
        <div
            className={cn('', {}, [
                className,
                classes[view],
            ])}
        >
            <Card>
                <header className={classes.header}>
                    <Skeleton
                        width={30}
                        height={30}
                        border="50%"
                    />
                    <Skeleton
                        width={150}
                        height={16}
                        className={classes.username}
                    />
                    <Skeleton
                        width={150}
                        height={16}
                        className={classes.date}
                    />
                </header>
                <Skeleton width={250} height={24} />
                <Skeleton
                    height={200}
                    className={classes.img}
                />

                <footer className={classes.footer}>
                    <Skeleton width={200} height={36} />
                </footer>
            </Card>
        </div>
    )
}
