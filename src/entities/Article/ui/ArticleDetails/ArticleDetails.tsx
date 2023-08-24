import { cn } from 'shared/lib/classNames'
import {
    FC,
    ReactNode,
    memo,
    useCallback,
    useEffect,
} from 'react'
import classes from './ArticleDetails.module.scss'
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ArticleDetailsReducer } from '../../model/slice/ArticleDetailsSlice'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/ArticleDetails'
import { Text, TextAlign, TextSize } from 'shared/ui/Text'
import { Skeleton } from 'shared/ui/Skeleton'
import { Avatar } from 'shared/ui/Avatar'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg'
import { Icon } from 'shared/ui/Icon'
import {
    ArticleBlock,
    ArticleBlockType,
} from '../../model/types/article'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

interface Props {
    className?: string
    id: string
}

const reducers = { articleDetais: ArticleDetailsReducer }

export const ArticleDetails: FC<Props> = memo(
    ({ className, id }) => {
        const { t } = useTranslation('article')
        const dispatch = useAppDispatch()
        const isLoading = useSelector(
            getArticleDetailsIsLoading
        )
        const error = useSelector(getArticleDetailsError)
        const data = useSelector(getArticleDetailsData)

        const renderBlock = useCallback(
            (block: ArticleBlock) => {
                switch (block.type) {
                    case ArticleBlockType.CODE:
                        return (
                            <ArticleCodeBlockComponent
                                key={block.id}
                                block={block}
                                className={classes.block}
                            />
                        )
                    case ArticleBlockType.IMAGE:
                        return (
                            <ArticleImageBlockComponent
                                key={block.id}
                                block={block}
                                className={classes.block}
                            />
                        )
                    case ArticleBlockType.TEXT:
                        return (
                            <ArticleTextBlockComponent
                                key={block.id}
                                className={classes.block}
                                block={block}
                            />
                        )
                    default:
                        return null
                }
            },
            []
        )

        let content: ReactNode

        if (isLoading) {
            content = (
                <>
                    <Skeleton
                        className={classes.avatar}
                        width={200}
                        height={200}
                        border="50%"
                    />
                    <Skeleton
                        className={classes.title}
                        width={300}
                        height={32}
                    />
                    <Skeleton
                        className={classes.skeleton}
                        width={600}
                        height={24}
                    />
                    <Skeleton
                        className={classes.skeleton}
                        width={'100%'}
                        height={200}
                    />
                    <Skeleton
                        className={classes.skeleton}
                        width={'100%'}
                        height={200}
                    />
                </>
            )
        } else if (error) {
            content = (
                <Text
                    align={TextAlign.CENTER}
                    title={t(
                        'Произошла ошибка при загрузке страницы'
                    )}
                />
            )
        } else {
            content = (
                <>
                    <div className={classes.avatarWrapper}>
                        <Avatar
                            size={200}
                            src={data?.img}
                            alt={t('Профиль')}
                            className={classes.avatar}
                        />
                    </div>

                    <Text
                        className={classes.title}
                        title={data?.title}
                        text={data?.subtitle}
                        size={TextSize.L}
                    />
                    <div className={classes.articleInfo}>
                        <Icon
                            Svg={EyeIcon}
                            className={classes.icon}
                        />
                        <Text text={String(data?.views)} />
                    </div>
                    <div className={classes.articleInfo}>
                        <Icon
                            Svg={CalendarIcon}
                            className={classes.icon}
                        />
                        <Text text={data?.createdAt} />
                    </div>
                    {data?.blocks.map(renderBlock)}
                </>
            )
        }

        useEffect(() => {
            if (__PROJECT__ !== 'storybook') {
                dispatch(fetchArticleById(id))
            }
        }, [dispatch, id])
        return (
            <DynamicModuleLoader
                removeAfterUnmount
                reducers={reducers}
            >
                <div
                    className={cn(
                        classes.ArticleDetails,
                        {},
                        [className]
                    )}
                >
                    {content}
                </div>
            </DynamicModuleLoader>
        )
    }
)
