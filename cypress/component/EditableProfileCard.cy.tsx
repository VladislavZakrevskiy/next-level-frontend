import { EditableProfileCard } from '../../src/features/EditableProfileCard/ui/EditableProfileCard/EditableProfileCard';
import { TestProvider } from '../../src/shared/lib/tests/componentRender/componentRender';
describe('EditableProfileCard.cy.tsx', () => { 
    it('mount', () => {
        cy.intercept('GET', '**/profile/*', {fixture: "profile.json"})

        cy.mount(<TestProvider options={{iniitialState: {
            user: {
                authData: {id: '4'}
            }
        }}}>
            <EditableProfileCard id='4'/>
            </TestProvider>)
    });
})