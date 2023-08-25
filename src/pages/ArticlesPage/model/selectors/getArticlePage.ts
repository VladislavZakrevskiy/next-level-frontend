import { StateSchema } from 'app/providers/StoreProvider'

export const getArticlePageView = (state: StateSchema) =>
    state.articlePage?.view
export const getArticlePageError = (state: StateSchema) =>
    state.articlePage?.error
export const getArticlePageIsLoading = (
    state: StateSchema
) => state.articlePage?.isLoading
