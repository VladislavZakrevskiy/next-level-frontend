import { cn } from 'shared/lib/classNames'
import { FC, useCallback } from 'react'
import classes from './ArticleListItem.module.scss'
import {
    Article,
    ArticleBlockType,
    ArticleTextBlock,
    ArticleView,
} from '../../model/types/article'
import { Avatar } from 'shared/ui/Avatar'
import { Text } from 'shared/ui/Text'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import { Icon } from 'shared/ui/Icon'
import { Card } from 'shared/ui/Card'
import { useHover } from 'shared/lib/hooks/useHover/useHover'
import { Button } from 'shared/ui/Button'
import { useTranslation } from 'react-i18next'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { useSelector } from 'react-redux'
import { getArticlePageView } from 'pages/ArticlesPage/model/selectors/getArticlePage'

interface Props {
    className?: string
    article: Article
    // view: ArticleView
}

export const ArticleListItem: FC<Props> = ({
    className,
    article,
    // view,
}) => {
    const { t } = useTranslation('article')
    const view: ArticleView =
        useSelector(getArticlePageView) || ArticleView.SMALL
    const nav = useNavigate()
    const types = (
        <Text
            text={article.type.join(', ')}
            className={classes.types}
        />
    )
    const views = (
        <>
            <Text
                text={String(article.views)}
                className={classes.views}
            />
            <Icon Svg={EyeIcon} />
        </>
    )

    const onItemClick = useCallback(() => {
        nav(RoutePath.article_details + article.id)
    }, [])

    if (view === ArticleView.SMALL) {
        return (
            <Card
                onClick={onItemClick}
                className={cn('', {}, [
                    className,
                    classes[view],
                ])}
            >
                <div className={classes.imageWrapper}>
                    <img
                        src={article.img}
                        alt={article.title}
                        className={classes.img}
                    />

                    <Text
                        text={article.createdAt}
                        className={classes.date}
                    />
                </div>
                <div className={classes.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text
                    text={article.title}
                    className={classes.title}
                />
            </Card>
        )
    }

    if (view === ArticleView.BIG) {
        console.log(view)
        const firstTextBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock

        return (
            <Card
                className={cn('', {}, [
                    className,
                    classes[view],
                ])}
            >
                <header className={classes.header}>
                    <Avatar
                        src={article.user.avatar || ''}
                        alt={article.user.username}
                        size={30}
                    />
                    <Text
                        text={article.user.username}
                        className={classes.username}
                    />
                    <Text
                        text={article.createdAt}
                        className={classes.date}
                    />
                </header>
                <Text title={article.title} />
                {types}
                <img
                    src={article.img}
                    alt={article.title}
                    className={classes.img}
                />
                {firstTextBlock && (
                    <ArticleTextBlockComponent
                        className={classes.textBlock}
                        block={firstTextBlock}
                    />
                )}
                <footer className={classes.footer}>
                    <Button onClick={onItemClick}>
                        {t('Читать далее...')}
                    </Button>
                    {views}
                </footer>
            </Card>
        )
    }

    return null
}
