import { USER_LOCAL_STORAGE_KEY } from "@/shared/consts/localStorage"

export const login = (username: string, password: string) => { 
	cy.request({
		method: "POST",
		url: "http://localhost:8000/login",
		body: {
			username, password
		}
	}).then(({body}) => {
		
		localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(body))
		cy.visit('/')
	})
}