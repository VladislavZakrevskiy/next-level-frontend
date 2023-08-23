import { lazy } from 'react';

export const LazyArticlePage = lazy(async () => await import('./ArticlesPage'));
