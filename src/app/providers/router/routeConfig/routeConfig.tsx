import { LazyAboutPage } from "@/pages/AboutPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { type RouteProps } from "react-router-dom";
import { LazyMainPage } from "../../../../pages/MainPage";
import { LazyProfilePage } from "@/pages/ProfilePage";
import { LazyArticlePage } from "@/pages/ArticlesPage";
import { LazyArticleDetailsPage } from "@/pages/ArticleDetailsPage";
import { LazyArticleCreatePage } from "@/pages/ArticleCreatePage";
import { LazyArticleEditPage } from "@/pages/ArticleEditPage";
import { LazyAdminPanelPage } from "@/pages/AdminPanelPage";
import { UserRoles } from "@/entities/User";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import {
	AppRoutes,
	getRouteMain,
	getRouteAbout,
	getRouteProfile,
	getRouteAdminPanel,
	getRouteForbidden,
	getRouteArticles,
	getRouteArticleDetails,
	getRouteArticleCreate,
	getRouteArticleEdit,
	getRouteNotFound,
} from "@/shared/consts/router";
import { AppRouteProps } from "@/shared/types/router";

export const routeConfig: Record<
	AppRoutes,
	AppRouteProps
> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <LazyMainPage />,
	},
	[AppRoutes.ABOUT]: {
		path: getRouteAbout(),
		element: <LazyAboutPage />,
	},
	[AppRoutes.PROFILE]: {
		path: getRouteProfile(':id'),
		element: <LazyProfilePage />,
		authOnly: true,
	},
	[AppRoutes.ADMIN_PANEL]: {
		path: getRouteAdminPanel(),
		element: <LazyAdminPanelPage />,
		authOnly: true,
	},
	[AppRoutes.FORBIDDEN]: {
		path: getRouteForbidden(),
		element: <ForbiddenPage />,
	},
	[AppRoutes.ARTICLES]: {
		path: getRouteArticles(),
		element: <LazyArticlePage />,
		authOnly: true,
	},
	[AppRoutes.ARTICLE_CREATE]: {
		path: getRouteArticleCreate(),
		element: <LazyArticleCreatePage />,
		authOnly: true,
	},
	[AppRoutes.ARTICLE_EDIT]: {
		path: getRouteArticleEdit(':id'),
		element: <LazyArticleEditPage />,
		authOnly: true,
		roles: [UserRoles.MANAGER, UserRoles.ADMIN],
	},
	[AppRoutes.ARTICLE_DETAILS]: {
		path: getRouteArticleDetails(':id'),
		element: <LazyArticleDetailsPage />,
		authOnly: true,
	},
	[AppRoutes.NOT_FOUND]: {
		path: getRouteNotFound(),
		element: <NotFoundPage />,
	},
};
