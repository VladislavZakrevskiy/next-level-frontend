export enum AppRoutes {
	MAIN = "main",
	ABOUT = "about",
	PROFILE = "profile",
	FORBIDDEN = "forbidden",
	ADMIN_PANEL = "admin_panel",
	ARTICLES = "acticles",
	ARTICLE_DETAILS = "article_details",
	ARTICLE_CREATE = "article_create",
	ARTICLE_EDIT = "article_edit",
	//last
	NOT_FOUND = "not_found",
}

export const getRouteMain = () => '/'
export const getRouteAbout = () => '/about'
export const getRouteProfile = (id: string) => '/profile/' + id
export const getRouteAdminPanel = () => '/admin'
export const getRouteForbidden = () => '/forbidden'
export const getRouteArticles = () => '/articles'
export const getRouteArticleDetails = (id: string) => '/articles/' + id
export const getRouteArticleCreate = () => "/acticles/new"
export const getRouteArticleEdit = (id: string) => "/acticles/" + id + "/edit"
export const getRouteNotFound = () => '*'

// export const RoutePath: Record<
// 	AppRoutes,
// 	string
// > = {
// 	[AppRoutes.MAIN]:getRouteMain(),
// 	[AppRoutes.ABOUT]: getRouteAbout(),
// 	[AppRoutes.PROFILE]:getRouteProfile(':id'), //:id
// 	[AppRoutes.ADMIN_PANEL]: getRouteAdminPanel(),
// 	[AppRoutes.FORBIDDEN]: getRouteForbidden(),
// 	[AppRoutes.ARTICLES]: getRouteArticles(),
// 	[AppRoutes.ARTICLE_DETAILS]:getRouteArticleDetails(':id'), //:id
// 	[AppRoutes.ARTICLE_CREATE]: getRouteArticleCreate(),
// 	[AppRoutes.ARTICLE_EDIT]:getRouteArticleEdit(':id'), //:id
// 	// last
// 	[AppRoutes.NOT_FOUND]:getRouteNotFound(),
// };export 
