describe("Список статей", () => {
	beforeEach(() => {
		cy.login("testuser", "123").then((data) => {
			cy.visit("/articles");
		});
	});

	it("Лист рендерится", () => {
		cy.getByTestId("ArticleList").should("exist");
		cy.getByTestId("ArticleListItem").should(
			"have.length.greaterThan",
			3
		);
	});

	it("Лист рендерится (с моком)", () => {
		cy.intercept('GET', '**/articles?*', {fixture: "article.json"})
		cy.getByTestId("ArticleList").should("exist");
		cy.getByTestId("ArticleListItem").should(
			"have.length.greaterThan",
			3
		);
	});

	it.skip("Скип", () => {
		cy.getByTestId("ArticleList").should("exist");
		cy.getByTestId("vhdbhvd").should("exist");
	});
});
