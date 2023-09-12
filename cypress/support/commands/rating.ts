export const setRate = (
	rating: number,
	feedback: string
) => {
	cy.getByTestId("StarRating-" + rating).click()
	cy.getByTestId("RatingCard.Input").type(feedback)
	cy.getByTestId("RatingCard.Send").click();
};

declare global {
	namespace Cypress {
		interface Chainable {
			setRate(
				rating: number,
				feedback: string
			): Chainable<void>;
		}
	}
}
