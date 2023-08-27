import { StateSchema } from 'app/providers/StoreProvider'

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