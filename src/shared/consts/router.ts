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

export const RoutePath: Record<
	AppRoutes,
	string
> = {
	[AppRoutes.MAIN]: "/",
	[AppRoutes.ABOUT]: "/about",
	[AppRoutes.PROFILE]: "/profile/", //:id
	[AppRoutes.ADMIN_PANEL]: "/admin",
	[AppRoutes.FORBIDDEN]: "/forbidden",
	[AppRoutes.ARTICLES]: "/acticles",
	[AppRoutes.ARTICLE_DETAILS]: "/acticles/", //:id
	[AppRoutes.ARTICLE_CREATE]: "/acticles/new",
	[AppRoutes.ARTICLE_EDIT]: "/acticles/:id/edit", //:id
	// last
	[AppRoutes.NOT_FOUND]: "*",
};
