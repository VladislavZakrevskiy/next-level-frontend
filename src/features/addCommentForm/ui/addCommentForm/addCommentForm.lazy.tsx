import { lazy } from 'react'

export const LazyAddCommentForm = lazy(
    async () => await import('./addCommentForm')
)
