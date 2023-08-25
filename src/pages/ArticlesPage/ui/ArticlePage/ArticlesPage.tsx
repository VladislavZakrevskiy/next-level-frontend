import { cn } from 'shared/lib/classNames'
import { FC, memo } from 'react'
import classes from './ArticlesPage.module.scss'
import { useTranslation } from 'react-i18next'
import { ArticleList } from '../../../../entities/Article/ui/ArticleList/ArticleList';
import { Article, ArticleView } from 'entities/Article';

interface Props {
    className?: string
}

const ArticlesPage: FC<Props> = ({ className }) => {
    const { t } = useTranslation('article')
    const articles: Article[] = []
    const view: ArticleView = ArticleView.SMALL

    return (
        <div
            className={cn(classes.ArticlesPage, {}, [
                className,
            ])}
        >
            <ArticleList view={view} articles={articles}/>
        </div>
    )
}

export default memo(ArticlesPage)