import { lazy } from 'react'

export const LazyArticleEditPage = lazy(
    async () => await import('./ArticleEditPage')
)
