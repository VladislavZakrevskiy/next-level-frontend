import { componentRender } from "@/shared/lib/tests/componentRender/componentRender"
import { AppRouter } from "./AppRouter"
import { getRouteAbout, getRouteProfile } from "@/shared/consts/router"
import { screen } from "@testing-library/react"

describe('app/router/AppRouter', () => { 
    test('page render', async () => { 
        componentRender(<AppRouter/>, {
            route: getRouteAbout()
        })

        const page = await screen.findByTestId('about')
        expect(page).toBeInTheDocument()
    
    })

    test('notFound render', async () => { 
        componentRender(<AppRouter/>, {
            route: '/kjdshvkjhdsmvj'
        })

        const page = await screen.findByTestId('notFound')
        expect(page).toBeInTheDocument()
    
    })

    test('redirect to firbidden render for not auth', async () => { 
        componentRender(<AppRouter/>, {
            route: getRouteProfile('1')
        })

        const page = await screen.findByTestId('mainPage')
        expect(page).toBeInTheDocument()
    })

    test('redirect to firbidden render for auth', async () => { 
        componentRender(<AppRouter/>, {
            route: getRouteProfile('1'),
            iniitialState: {
                user: {
                    _inited: true, authData: {
                        id: '1', username: 'username'
                    }
                }
            }
        })

        const page = await screen.findByTestId('profilePage')
        expect(page).toBeInTheDocument()
    })
})