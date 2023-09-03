import { cn } from 'shared/lib/classNames'
import {
    FC,
    HTMLAttributeAnchorTarget,
    useCallback,
} from 'react'
import classes from './ArticleListItem.module.scss'
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
import { AppLink } from 'shared/ui/AppLink'
import { ArticleBlockType, ArticleView } from 'entities/Article/model/consts/consts'
import { Article, ArticleTextBlock } from 'entities/Article/model/types/article'

interface Props {
    className?: string
    article: Article
    view: ArticleView
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem: FC<Props> = ({
    className,
    article,
    view,
    target = '_blank',
}) => {
    const { t } = useTranslation('article')
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

    if (view === ArticleView.SMALL) {
        return (
            <AppLink
                to={RoutePath.article_details + article.id}
                target={target}
                className={cn('', {}, [
                    className,
                    classes[view],
                ])}
            >
                <Card>
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
            </AppLink>
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
                    <AppLink
                        target={target}
                        to={
                            RoutePath.article_details +
                            article.id
                        }
                    >
                        <Button>
                            {t('Читать далее...')}
                        </Button>
                    </AppLink>
                    {views}
                </footer>
            </Card>
        )
    }

    return null
}
