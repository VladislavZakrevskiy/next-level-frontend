import { LazyAboutPage } from 'pages/AboutPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { type RouteProps } from 'react-router-dom'
import { LazyMainPage } from '../../../pages/MainPage'
import { LazyProfilePage } from 'pages/ProfilePage'
import { LazyArticlePage } from 'pages/ArticlesPage'
import { LazyArticleDetailsPage } from 'pages/ArticleDetailsPage'
import { LazyArticleCreatePage } from 'pages/ArticleCreatePage'
import { LazyArticleEditPage } from 'pages/ArticleEditPage'

export type AppRouteProps = RouteProps & {
    authOnly?: boolean
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'acticles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    //last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/', //:id
    [AppRoutes.ARTICLES]: '/acticles',
    [AppRoutes.ARTICLE_DETAILS]: '/acticles/', //:id
    [AppRoutes.ARTICLE_CREATE]: '/acticles/new', 
    [AppRoutes.ARTICLE_EDIT]: '/acticles/:id/edit', //:id
    // last
    [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, AppRouteProps> =
    {
        [AppRoutes.MAIN]: {
            path: RoutePath[AppRoutes.MAIN],
            element: <LazyMainPage />,
        },
        [AppRoutes.ABOUT]: {
            path: RoutePath[AppRoutes.ABOUT],
            element: <LazyAboutPage />,
        },
        [AppRoutes.PROFILE]: {
            path: `${RoutePath[AppRoutes.PROFILE]}:id`,
            element: <LazyProfilePage />,
            authOnly: true,
        },
        [AppRoutes.ARTICLES]: {
            path: RoutePath[AppRoutes.ARTICLES],
            element: <LazyArticlePage />,
            authOnly: true,
        },
        [AppRoutes.ARTICLE_CREATE]: {
            path: RoutePath[AppRoutes.ARTICLE_CREATE],
            element: <LazyArticleCreatePage />,
            authOnly: true,
        },
        [AppRoutes.ARTICLE_EDIT]: {
            path: RoutePath[AppRoutes.ARTICLE_EDIT],
            element: <LazyArticleEditPage />,
            authOnly: true,
        },
        [AppRoutes.ARTICLE_DETAILS]: {
            path: `${
                RoutePath[AppRoutes.ARTICLE_DETAILS]
            }:id`,
            element: <LazyArticleDetailsPage />,
            authOnly: true,
        },
        [AppRoutes.NOT_FOUND]: {
            path: RoutePath[AppRoutes.NOT_FOUND],
            element: <NotFoundPage />,
        },
    }
