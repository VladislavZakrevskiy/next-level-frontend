import { lazy } from 'react'

export const LazyArticleCreatePage = lazy(
    async () => await import('./ArticleCreatePage')
)
