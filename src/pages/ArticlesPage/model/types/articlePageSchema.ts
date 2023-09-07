import { EntityState } from '@reduxjs/toolkit'
import { Article, ArticleSortField, ArticleType, ArticleView } from '@/entities/Article'
import { SortOrder } from '@/shared/types'

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
