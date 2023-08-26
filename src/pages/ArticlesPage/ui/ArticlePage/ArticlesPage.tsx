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
    getArticlePageIsLoading,
    getArticlePageView,
} from '../../model/selectors/getArticlePage'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/UseInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ArticleViewSelector } from 'features/ArticleViewSelector'
import { Page } from 'shared/ui/Page'
import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage/fetchNextArticlePage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'

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
    const isLoading = useSelector(getArticlePageIsLoading)

    useInitialEffect(() => {
        dispatch(initArticlesPage())
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
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
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
