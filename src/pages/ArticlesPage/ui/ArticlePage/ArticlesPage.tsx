import { cn } from 'shared/lib/classNames'
import { FC, memo, useCallback } from 'react'
import classes from './ArticlesPage.module.scss'
import { useTranslation } from 'react-i18next'
import { ArticleList } from '../../../../entities/Article/ui/ArticleList/ArticleList'
import { Article, ArticleView } from 'entities/Article'
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
    ArticlePageActions,
    ArticlePageReducer,
    articlePageSelectors,
} from '../../model/slice/articlePageSlice'
import { useSelector } from 'react-redux'
import {
    getArticlePageError,
    getArticlePageHasMore,
    getArticlePageIsLoading,
    getArticlePageNumber,
    getArticlePageView,
} from '../../model/selectors/getArticlePage'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/UseInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchArticleList } from '../../model/services/fetchArticleList/fetchArticleList'
import { ArticleViewSelector } from 'features/ArticleViewSelector'
import { Page } from 'shared/ui/Page'
import { fetchNextArticlePage } from 'pages/ArticlesPage/model/services/fetchNextArticlePage/fetchNextArticlePage'

interface Props {
    className?: string
}

const reducers: ReducerList = {
    articlePage: ArticlePageReducer,
}

const ArticlesPage: FC<Props> = ({ className }) => {
    const { t } = useTranslation('article')
    const articles: Article[] = useSelector(
        articlePageSelectors.selectAll
    )
    const dispatch = useAppDispatch()
    const view: ArticleView =
        useSelector(getArticlePageView) || ArticleView.SMALL
    const error = useSelector(getArticlePageError)
    const isLoading = useSelector(getArticlePageIsLoading)
    const page = useSelector(getArticlePageNumber) || 1
    const hasMore = useSelector(getArticlePageHasMore)

    useInitialEffect(() => {
        dispatch(ArticlePageActions.initState())
        dispatch(
            fetchArticleList({
                page: 1,
            })
        )
    })

    const onLoadNextPage = useCallback(() => {
        dispatch(fetchNextArticlePage())
    }, [])

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(ArticlePageActions.setView(view))
        },
        []
    )

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                onScrollEnd={onLoadNextPage}
                className={cn(classes.ArticlesPage, {}, [
                    className,
                ])}
            >
                <ArticleViewSelector
                    onViewClick={onChangeView}
                    view={view}
                />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)
