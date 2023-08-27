import { cn } from 'shared/lib/classNames'
import { FC, useCallback, useMemo } from 'react'
import classes from './articleTypeTabs.module.scss'
import { useSelector } from 'react-redux'
import { getArticlePageType } from 'pages/ArticlesPage/model/selectors/getArticlePage'
import { TabItem, Tabs } from 'shared/ui/Tabs'
import { ArticleType } from 'entities/Article'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ArticlePageActions } from 'pages/ArticlesPage/model/slice/articlePageSlice'

interface Props {
    className?: string
    fetchData: () => void
}

export const ArticleTypeTabs: FC<Props> = ({
    className,
    fetchData,
}) => {
    const type = useSelector(getArticlePageType)
    const { t } = useTranslation('article')
    const dispatch = useAppDispatch()
    const tabsOptions = useMemo<TabItem[]>(
        () => [
            {
                value: ArticleType.ALL,
                content: t('Все'),
            },
            {
                value: ArticleType.IT,
                content: t('Айти'),
            },
            {
                value: ArticleType.ECONOMICS,
                content: t('Экономика'),
            },
            {
                value: ArticleType.SCIENCE,
                content: t('Наука'),
            },
        ],
        []
    )
    const onChangeType = useCallback(
        (tab: TabItem) => {
            dispatch(
                ArticlePageActions.setType(
                    tab.value as ArticleType
                )
            )
            dispatch(ArticlePageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData]
    )

    return (
        <Tabs
            className={cn('', {}, [className])}
            tabs={tabsOptions}
            value={type}
            onTabClick={onChangeType}
        />
    )
}
