import { cn } from '@/shared/lib/classNames'
import { FC, memo, useCallback } from 'react'
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ArticlePageReducer } from '../../model/slice/articlePageSlice'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from '@/widgets/Page'
import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage/fetchNextArticlePage'
import { ArticlePageFilters } from '../ArticlePageFilters/ArticlePageFilters'
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList'
import classes from './ArticlePage.module.scss'
import { ActiclePageGreeting } from '@/features/acticlePageGreeting'

interface Props {
    className?: string
}

const reducers: ReducerList = {
    articlePage: ArticlePageReducer,
}

const ArticlesPage: FC<Props> = ({ className }) => {
    const dispatch = useAppDispatch()

    const onLoadNextPage = useCallback(() => {
        dispatch(fetchNextArticlePage())
    }, [])

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page data-testid='ArticlesPage'
                onScrollEnd={onLoadNextPage}
                className={cn('', {}, [className])}
            >
                <ArticlePageFilters />
                <ArticleInfiniteList
                    className={classes.list}
                />
                <ActiclePageGreeting/>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)
