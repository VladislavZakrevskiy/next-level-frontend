import { cn } from 'shared/lib/classNames'
import { FC, memo } from 'react'
import classes from './ArticlesPage.module.scss'
import { useTranslation } from 'react-i18next'

interface Props {
    className?: string
}

const ArticlesPage: FC<Props> = ({ className }) => {
    const { t } = useTranslation('article')

    return (
        <div
            className={cn(classes.ArticlesPage, {}, [
                className,
            ])}
        >
            ARTICLES PAGE
        </div>
    )
}

export default memo(ArticlesPage)