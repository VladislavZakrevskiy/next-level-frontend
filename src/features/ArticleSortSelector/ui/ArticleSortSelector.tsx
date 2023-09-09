import { cn } from '@/shared/lib/classNames'
import { FC, useMemo } from 'react'
import classes from './ArticleSortSelector.module.scss'
import { Select, SelectOption } from '@/shared/ui/Select'
import { useTranslation } from 'react-i18next'
import { SortOrder } from '@/shared/types'
import { ArticleSortField } from '@/entities/Article/model/consts/consts'

interface Props {
    className?: string
    sort?: ArticleSortField
    order?: SortOrder
    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector: FC<Props> = ({
    className,
    onChangeOrder,
    onChangeSort,
    order,
    sort,
}) => {
    const { t } = useTranslation('article')

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            {
                value: 'asc',
                content: t('Возрастанию'),
            },
            { value: 'desc', content: t('Убыванию') },
        ],
        [t]
    )

    const sortOptions = useMemo<SelectOption<ArticleSortField>[]>(
        () => [
            {
                value: ArticleSortField.CREATED,
                content: t('Дате создания'),
            },
            {
                value: ArticleSortField.VIEW,
                content: t('Просмотрам'),
            },
            {
                value: ArticleSortField.TITLE,
                content: t('Названию'),
            },
        ],
        [t]
    )

    return (
        <div
            className={cn(classes.ArticleSortSelector, {}, [
                className,
            ])}
        >
            <Select
                label={t('Сортировать по')}
                options={sortOptions}
                value={sort}
                onChange={onChangeSort}
            />
            <Select
                label={t('по')}
                options={orderOptions}
                value={order}
                onChange={onChangeOrder}
            />
        </div>
    )
}
