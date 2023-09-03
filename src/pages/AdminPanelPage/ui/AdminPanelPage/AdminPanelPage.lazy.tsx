import { lazy } from 'react';

export const LazyAdminPanelPage = lazy(async () => await import('./AdminPanelPage'));
