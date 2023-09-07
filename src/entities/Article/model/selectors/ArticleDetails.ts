import { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleDetailsData = (state: StateSchema) =>
    state.articleDetais?.data
export const getArticleDetailsError = (
    state: StateSchema
) => state.articleDetais?.error
export const getArticleDetailsIsLoading = (
    state: StateSchema
) => state.articleDetais?.isLoading
