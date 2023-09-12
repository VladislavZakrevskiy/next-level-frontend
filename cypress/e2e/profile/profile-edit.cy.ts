import { selectByTestId } from "cypress/helpers/selectByTestId";

let profileId: string

describe("Редактирование профиля", () => {
	beforeEach(() => {
		cy.login("testuser", "123").then((data) => {
            profileId = data.id
			cy.visit("/profile" + data.id);
		});
	});

    afterEach(() => {
        cy.resetProfile(profileId)
    })

	it("Профиль успешно загружается", () => {
		cy.getByTestId(
			"ProfileCard.firstname"
		).should("have.value", "test");
	});

	it("Редактируем профиль", () => {
		const newFirstname = "new";
		const newLastname = "lastname";

		cy.updateProfile(newFirstname, newLastname);

		cy.getByTestId(
			"ProfileCard.firstname"
		).should("have.value", newFirstname);
		cy.getByTestId("ProfileCard.lastname").should(
			"have.value",
			newLastname
		);
	});

	it("Редактируем профиль", () => {});
});
