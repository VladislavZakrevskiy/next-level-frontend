import { cn } from '@/shared/lib/classNames'
import { FC, useCallback } from 'react'
import classes from './ArticleDetailsHeader.module.scss'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { Button } from '@/shared/ui/Button'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getUserAuthData } from '@/entities/User'
import { getArticleDetailsData } from '@/entities/Article/model/selectors/ArticleDetails'
import { HStack } from '@/shared/ui/Stack'

interface Props {
    className?: string
}

export const ArticleDetailsHeader: FC<Props> = ({
    className,
}) => {
    const { t } = useTranslation('acticle')
    const nav = useNavigate()

    const userData = useSelector(getUserAuthData)
    const article = useSelector(getArticleDetailsData)
    const canEdit = userData?.id === article?.user.id

    const onBackToList = useCallback(() => {
        nav(RoutePath.acticles)
    }, [nav])

    const onEditArticle = useCallback(() => {
        nav(
            RoutePath.article_details +
                article?.id +
                '/edit'
        )
    }, [nav])

    return (
        <HStack
            justify="between"
            max
            className={cn('', {}, [className])}
        >
            <Button onClick={onBackToList}>
                {t('Назад к списку')}
            </Button>
            {canEdit && (
                <Button onClick={onEditArticle}>
                    {t('Редактировать')}
                </Button>
            )}
        </HStack>
    )
}
