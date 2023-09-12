import { cn } from '@/shared/lib/classNames'
import { FC, memo } from 'react'
import classes from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { ArticleDetails } from '@/entities/Article'
import { useParams } from 'react-router-dom'
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ArticleDetailsCommentsReducer } from '../../model/slice/ArticleDetailsCommentsSlice'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from '@/widgets/Page'
import { ArticleDetailsPageRecommenedReducer } from '../../model/slice/ArticleDetailsPageRecommenedSlice'
import { VStack } from '@/shared/ui/Stack'
import { ArticleDetailsHeader } from '../ArticleDetailsHeader/ArticleDetailsHeader'
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList'
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments'
import { ArticleRating } from '@/features/ArticleRating'

interface Props {
    className?: string
}

const reducers: ReducerList = {
    articleDetailsComments: ArticleDetailsCommentsReducer,
    articelDetailsRecommended:
        ArticleDetailsPageRecommenedReducer,
}

const ArticleDetailsPage: FC<Props> = ({ className }) => {
    const { t } = useTranslation('acticle')
    const { id } = useParams<{ id: string }>()

    if (!id) {
        return (
            <Page data-testid='ArticleDetailsPage'
                className={cn(
                    classes.ArticleDetailsPage,
                    {},
                    [className]
                )}
            >
                {t('Статья не найдена')}
            </Page>
        )
    }
    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <Page data-testid='ArticleDetailsPage'
                className={cn(
                    classes.ArticleDetailsPage,
                    {},
                    [className]
                )}
            >
                <VStack max gap="16">
                    <ArticleDetailsHeader />
                    <ArticleDetails id={id} />
                    <ArticleRating articleId={id}/>
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)
