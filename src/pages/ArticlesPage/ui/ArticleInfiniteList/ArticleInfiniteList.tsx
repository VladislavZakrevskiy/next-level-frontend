import { cn } from '@/shared/lib/classNames'
import { FC } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Article, ArticleList, ArticleView } from '@/entities/Article'
import { articlePageSelectors } from '@/pages/ArticlesPage/model/slice/articlePageSlice'
import {
    getArticlePageIsLoading,
    getArticlePageView,
} from '@/pages/ArticlesPage/model/selectors/getArticlePage'
import { useSearchParams } from 'react-router-dom'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/UseInitialEffect'
import { initArticlesPage } from '@/pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage'

interface Props {
    className?: string
}

export const ArticleInfiniteList: FC<Props> = ({
    className,
}) => {
    const dispatch = useAppDispatch()
    const articles: Article[] = useSelector(
        articlePageSelectors.selectAll
    )
    const view =
        useSelector(getArticlePageView) || ArticleView.SMALL
    const isLoading = useSelector(getArticlePageIsLoading)
    const [searchParams] = useSearchParams()

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams))
    })
    return (
        <div
            className={cn('', {}, [
                className,
            ])}
        >
            <ArticleList
                isLoading={isLoading}
                view={view}
                articles={articles}
            />
        </div>
    )
}
