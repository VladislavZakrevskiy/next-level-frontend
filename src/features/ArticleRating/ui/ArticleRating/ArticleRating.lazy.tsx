import { Suspense, lazy } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Skeleton } from '@/shared/ui/Skeleton';

export const LazyArticleRating = lazy(async () => await import('./ArticleRating'));

export const ArticleRating = (props: ArticleRatingProps) => {
    return (
            <Suspense fallback={<Skeleton width={'100%'} height={140}/>}>
                <LazyArticleRating {...props}/>
            </Suspense>
        )
}