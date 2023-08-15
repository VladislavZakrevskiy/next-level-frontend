import { fireEvent, screen } from '@testing-library/react'
import { Sidebar } from '../ui/Sidebar/Sidebar';
import { withTranslation } from 'react-i18next';
import { renderWithTranslation } from '../../../shared/lib/tests/renderWithTranslation/renderWithTranslation';

describe('Sidebar', () => {
    test('Sidebar exist?', () => {
        renderWithTranslation(<Sidebar/>)
        expect(screen.getByTestId("TEST")).toBeInTheDocument()
    })

    test('Sidebar collapses?', () => {
        renderWithTranslation(<Sidebar/>)
        const toggleBtn = screen.getByTestId('sidebar-toggle')
        fireEvent.click(toggleBtn)
        expect(screen.getByTestId('TEST')).toHaveClass('collapsed')
    })
})
