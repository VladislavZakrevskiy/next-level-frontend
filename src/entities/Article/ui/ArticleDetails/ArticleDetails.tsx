import { cn } from '@/shared/lib/classNames'
import {
    FC,
    ReactNode,
    memo,
    useCallback,
    useEffect,
} from 'react'
import classes from './ArticleDetails.module.scss'
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ArticleDetailsReducer } from '../../model/slice/ArticleDetailsSlice'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchArticleById } from '@/entities/Article/model/services/fetchArticleById/fetchArticleById'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/ArticleDetails'
import { Text, TextAlign, TextSize } from '@/shared/ui/Text'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Avatar } from '@/shared/ui/Avatar'
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg'
import { Icon } from '@/shared/ui/Icon'
import {
    ArticleBlock,
    ArticleBlockType,
} from '../../model/types/article'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { HStack, VStack } from '@/shared/ui/Stack'

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
                            />
                        )
                    case ArticleBlockType.IMAGE:
                        return (
                            <ArticleImageBlockComponent
                                key={block.id}
                                block={block}
                            />
                        )
                    case ArticleBlockType.TEXT:
                        return (
                            <ArticleTextBlockComponent
                                key={block.id}
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
                        width={300}
                        height={32}
                    />
                    <Skeleton
                        width={600}
                        height={24}
                    />
                    <Skeleton
                        width={'100%'}
                        height={200}
                    />
                    <Skeleton
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
                    <HStack justify="center">
                        <Avatar
                            size={200}
                            src={data?.img || ''}
                            alt={t('Профиль')}
                            className={classes.avatar}
                        />
                    </HStack>

                    <VStack gap="4" max>
                        <Text
                            title={data?.title}
                            text={data?.subtitle}
                            size={TextSize.L}
                        />
                        <HStack gap="8">
                            <Icon Svg={EyeIcon} />
                            <Text
                                text={String(data?.views)}
                            />
                        </HStack>
                        <HStack gap="8">
                            <Icon Svg={CalendarIcon} />
                            <Text text={data?.createdAt} />
                        </HStack>
                    </VStack>
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
                <VStack max
                    gap="16"
                    className={cn(
                        classes.ArticleDetails,
                        {},
                        [className]
                    )}
                >
                    {content}
                </VStack>
            </DynamicModuleLoader>
        )
    }
)
