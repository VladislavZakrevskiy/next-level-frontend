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
    getArticlePageIsLoading,
    getArticlePageView,
} from '../../model/selectors/getArticlePage'
import { useInitialEffect } from 'shared/lib/hooks/UseInitialEffect/UseInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchArticleList } from '../../model/services/fetchArticleList/fetchArticleList'
import { ArticleViewSelector } from 'features/ArticleViewSelector'

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

    useInitialEffect(() => {
        dispatch(fetchArticleList())
        dispatch(ArticlePageActions.initState())
    })

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(ArticlePageActions.setView(view))
        },
        []
    )

    if (error) {
        return
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div
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
            </div>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)
