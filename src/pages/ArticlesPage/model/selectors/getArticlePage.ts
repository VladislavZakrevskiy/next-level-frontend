import { StateSchema } from '@/app/providers/StoreProvider'
import { ArticleType } from '@/entities/Article'

export const getArticlePageView = (state: StateSchema) =>
    state.articlePage?.view

export const getArticlePageError = (state: StateSchema) =>
    state.articlePage?.error

export const getArticlePageIsLoading = (
    state: StateSchema
) => state.articlePage?.isLoading

export const getArticlePageNumber = (state: StateSchema) =>
    state.articlePage?.page

export const getArticlePageLimit = (state: StateSchema) =>
    state.articlePage?.limit

export const getArticlePageHasMore = (state: StateSchema) =>
    state.articlePage?.hasMore

export const getArticlePageInited = (state: StateSchema) =>
    state.articlePage?._inited

    export const getArticlePageSort = (state: StateSchema) =>
    state.articlePage?.sort
    
    export const getArticlePageOrder = (state: StateSchema) =>
    state.articlePage?.order

    export const getArticlePageSearch = (state: StateSchema) =>
    state.articlePage?.search

    export const getArticlePageType = (state: StateSchema) =>
    state.articlePage?.type || ArticleType.ALL