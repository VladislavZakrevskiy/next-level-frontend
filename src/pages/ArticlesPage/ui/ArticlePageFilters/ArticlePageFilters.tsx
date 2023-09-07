import { cn } from '@/shared/lib/classNames'
import { FC, useCallback, useMemo } from 'react'
import classes from './ArticlePageFilters.module.scss'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import {
    getArticlePageOrder,
    getArticlePageSearch,
    getArticlePageSort,
    getArticlePageType,
    getArticlePageView,
} from '@/pages/ArticlesPage/model/selectors/getArticlePage'
import { ArticleSortField, ArticleView } from '@/entities/Article'
import { ArticlePageActions } from '@/pages/ArticlesPage/model/slice/articlePageSlice'
import { ArticleViewSelector } from '@/features/ArticleViewSelector'
import { Select } from '@/shared/ui/Select'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'
import { useTranslation } from 'react-i18next'
import { ArticleSortSelector } from '@/entities/Article/ui/ArticleSortSelector/ArticleSortSelector'
import { SortOrder } from '@/shared/types'
import { fetchArticleList } from '@/pages/ArticlesPage/model/services/fetchArticleList/fetchArticleList'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { TabItem, Tabs } from '@/shared/ui/Tabs'
import { ArticleTypeTabs } from '@/features/articleTypeTabs/articleTypeTabs';

interface Props {
    className?: string
}

export const ArticlePageFilters: FC<Props> = ({
    className,
}) => {
    const { t } = useTranslation('article')
    const dispatch = useAppDispatch()
    const view =
        useSelector(getArticlePageView) || ArticleView.SMALL

    const sort = useSelector(getArticlePageSort)
    const order = useSelector(getArticlePageOrder)
    const search = useSelector(getArticlePageSearch)
    

    const fetchData = useCallback(() => {
        dispatch(fetchArticleList({ replace: true }))
    }, [dispatch])

    

    const debouncedDetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(ArticlePageActions.setView(view))
            dispatch(ArticlePageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData]
    )

    const onChangeOrder = useCallback(
        (order: SortOrder) => {
            dispatch(ArticlePageActions.setOrder(order))
            dispatch(ArticlePageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData]
    )

    const onChangeSort = useCallback(
        (sort: ArticleSortField) => {
            dispatch(ArticlePageActions.setSort(sort))
            dispatch(ArticlePageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData]
    )

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(ArticlePageActions.setSearch(search))
            dispatch(ArticlePageActions.setPage(1))
            debouncedDetchData()
        },
        [debouncedDetchData, dispatch]
    )

    return (
        <div
            className={cn(classes.ArticlePageFilters, {}, [
                className,
            ])}
        >
            <div>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector
                    onViewClick={onChangeView}
                    view={view}
                />
            </div>
            <Card>
                <Input
                    placeholder={t('Поиск')}
                    onChange={onChangeSearch}
                    value={search}
                />
            </Card>
            <ArticleTypeTabs fetchData={fetchData}/>
        </div>
    )
}
