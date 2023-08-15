import { render, screen } from '@testing-library/react'
import { Button, ThemeButton } from '../index'

describe('Button', () => {
    test('Button exist', () => {
        render(<Button>TEST</Button>)
        expect(screen.getByText("TEST")).toBeInTheDocument()
    })

    test('Button has class', () => {
        render(<Button theme={ThemeButton.CLEAR}>TEST</Button>)
        expect(screen.getByText("TEST")).toHaveClass('clear')
    })
})
