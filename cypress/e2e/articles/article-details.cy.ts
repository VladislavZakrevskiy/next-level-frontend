let currentArticleId: string;

describe("Страницы просмотра статьи", () => {
	beforeEach(() => {
		cy.login("testuser", "123");
		cy.createArticle().then((article) => {
			currentArticleId = article.id;
			cy.visit("articles/" + currentArticleId);
		});
	});

	afterEach(() => {
		cy.removeArticle(currentArticleId);
	});

	it("Статья рендерится", () => {
		cy.getByTestId("ArticleDetailsPage").should(
			"exist"
		);
	});

	it("Есть список рекомендаций", () => {
		cy.getByTestId(
			"ArticleRecommendationsList"
		).should("exist");
	});

	it("Оставляем комментарий", () => {
		cy.getByTestId("ArticleDetailsPage");
		cy.getByTestId(
			"AddCommentForm"
		).scrollIntoView();
		cy.addComment("text");
		cy.getByTestId("CommentCard.Content").should(
			"have.length",
			1
		);
	});

	it("Ставим оценку", () => {
		cy.intercept("GET", "**/articles", {
			fixture: "article-details.json",
		});
		cy.getByTestId("ArticleDetailsPage");
		cy.getByTestId("RatingCard").scrollIntoView();
		cy.setRate(5, "feedback");
		cy.get("[data-selected=true]").should(
			"have.length",
			5
		);
	});
});
