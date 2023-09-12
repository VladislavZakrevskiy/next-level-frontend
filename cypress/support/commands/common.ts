import { User } from "@/entities/User/model/types/User"
import { USER_LOCAL_STORAGE_KEY } from "../../../src/shared/consts/localStorage"
import { selectByTestId } from "cypress/helpers/selectByTestId"

export const login = (username: string, password: string) => { 
	return cy.request({
		method: "POST",
		url: "http://localhost:8000/login",
		body: {
			username, password
		}
	}).then(({body}) => {
		
		localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(body))
		cy.visit('/')
		return body
	})
}

export const getByTestId = (testId: string) => {
	return cy.get(selectByTestId(testId))
}

declare global {
	namespace Cypress {
		interface Chainable {
			login(
				username: string,
				password: string
			): Chainable<User>;
			getByTestId(testId:string): ReturnType<typeof cy.get>
		}
	}
}