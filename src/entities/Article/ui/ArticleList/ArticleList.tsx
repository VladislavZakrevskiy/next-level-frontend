import { cn } from 'shared/lib/classNames'
import { FC, useCallback } from 'react'
import classes from './ArticleList.module.scss'
import {
    Article,
    ArticleView,
} from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

interface Props {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view: ArticleView
}

const getSkeleton = (view: ArticleView) => {
    return new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, i) => (
            <ArticleListItemSkeleton
                view={view}
                key={i}
                className={classes.card}
            />
        ))
}

export const ArticleList: FC<Props> = ({
    className,
    view = ArticleView.SMALL,
    articles,
    isLoading,
}) => {
    const renderArticle = useCallback(
        (article: Article) => {
            return (
                <ArticleListItem
                    key={article.id}
                    className={classes.card}
                    article={article}
                    view={view}
                />
            )
        },
        []
    )

    if (isLoading) {
        return <div className={classes[view]}>
            {getSkeleton(view)}
        </div>
    }

    return (
        <div
            className={cn('', {}, [
                className,
                classes[view],
            ])}
        >
            {articles.length && articles.map(renderArticle)}
        </div>
    )
}
