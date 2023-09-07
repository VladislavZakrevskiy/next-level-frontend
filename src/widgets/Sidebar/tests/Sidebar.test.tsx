import { fireEvent, screen } from '@testing-library/react'
import { Sidebar } from '../ui/Sidebar/Sidebar';
import { renderWithTranslation } from '../../../shared/lib/tests/renderWithTranslation/renderWithTranslation';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

describe('Sidebar', () => {
    test('Sidebar exist?', () => {
        renderWithTranslation(<Sidebar/>)
        expect(screen.getByTestId("TEST")).toBeInTheDocument()
    })

    test('Sidebar collapses?', () => {
        componentRender(<Sidebar/>, {})
        const toggleBtn = screen.getByTestId('sidebar-toggle')
        fireEvent.click(toggleBtn)
        expect(screen.getByTestId('TEST')).toHaveClass('collapsed')
    })
})
