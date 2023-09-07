import { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleDetailsRecommendedIsLoading = (
    state: StateSchema
) => state.articelDetailsRecommended?.isLoading

export const getArticleDetailsRecommendedError = (
    state: StateSchema
) => state.articelDetailsRecommended?.error