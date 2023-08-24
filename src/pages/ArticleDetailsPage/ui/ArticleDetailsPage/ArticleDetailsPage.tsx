import { cn } from 'shared/lib/classNames'
import { FC, memo } from 'react'
import classes from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { ArticleDetails } from 'entities/Article'
import { useParams } from 'react-router-dom'

interface Props {
    className?: string
}

const ArticleDetailsPage: FC<Props> = ({ className }) => {
    const { t } = useTranslation('acticle')
    const { id } = useParams<{ id: string }>()

    if (!id) {
        return <div
        className={cn(classes.ArticleDetailsPage, {}, [
            className,
        ])}
    >
        {t("Статья не найдена")}
    </div>
    }
    return (
        <div
            className={cn(classes.ArticleDetailsPage, {}, [
                className,
            ])}
        >
            <ArticleDetails id={id} />
        </div>
    )
}

export default memo(ArticleDetailsPage)
