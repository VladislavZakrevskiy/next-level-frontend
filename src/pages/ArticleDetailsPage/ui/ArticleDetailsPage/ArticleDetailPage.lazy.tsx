import { lazy } from 'react';

export const LazyArticleDetailsPage = lazy(async () => await import('./ArticleDetailsPage'));
