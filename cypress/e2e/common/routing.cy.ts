import { selectByTestId } from "../../helpers/selectByTestId";

describe('Роутинг', () => {
  describe('Не авторизованный', () => { 
    it('Переход на главную', () => {
      cy.visit('/')
      cy.get(selectByTestId('mainPage')).should('exist')
    });

    it('Переход на страницу профиля', () => {
      cy.visit('/profile/1')
      cy.get(selectByTestId('profilePage')).should('exist')
    });

    it('Переход на несуществующую страницу', () => {
      cy.visit('/dcsdvdsvdsvdsv')
      cy.get(selectByTestId("notFound")).should('exist')
    });

    
  })

  describe('Авторизованный', () => { 
    beforeEach(() => {
      cy.login('admin', '123')
    })

    it('Переход на страницу профиля', () => {
      cy.visit('/profile/1')
      cy.get(selectByTestId("profilePage")).should('exist')
    });

    it('Переход на страницу статей', () => {
      cy.visit('/articles')
      cy.get(selectByTestId("ArticlesPage")).should('exist')
    });
  })
})