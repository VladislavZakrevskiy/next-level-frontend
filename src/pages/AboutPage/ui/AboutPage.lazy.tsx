import { lazy } from 'react';

export const LazyAboutPage = lazy(async () => await import('./AboutPage'));
