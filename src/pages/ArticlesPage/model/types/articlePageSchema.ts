import { EntityState } from '@reduxjs/toolkit'
import { Article, ArticleView } from 'entities/Article'
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article'
import { SortOrder } from 'shared/types'

export interface ArticlePageSchema
    extends EntityState<Article> {
    isLoading?: boolean
    error?: string

    // pagination
    view: ArticleView
    page: number
    limit: number
    hasMore: boolean

    _inited: boolean

    //filters
    order: SortOrder
    sort: ArticleSortField
    search: string
    type: ArticleType
}
