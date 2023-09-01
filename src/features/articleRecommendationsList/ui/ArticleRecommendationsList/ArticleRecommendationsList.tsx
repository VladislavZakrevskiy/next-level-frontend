import { cn } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { Text, TextSize } from 'shared/ui/Text'
import { ArticleList, ArticleView } from 'entities/Article'
import { VStack } from 'shared/ui/Stack'
import { useGetArticleRecommendationsListQuery } from '../../api/ArticleRecommendationsApi'

interface ArticleRecommendationsListProps {
    className?: string
}

export const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className } = props
        const { t } = useTranslation()
        const { data: articles, isLoading } =
            useGetArticleRecommendationsListQuery(3)

        return (
            <VStack
                gap="8"
                className={cn('', {}, [className])}
            >
                <Text
                    size={TextSize.L}
                    title={t('Рекшомендуем')}
                />
                <ArticleList
                    articles={articles}
                    view={ArticleView.SMALL}
                    isLoading={isLoading}
                />
            </VStack>
        )
    }
)
