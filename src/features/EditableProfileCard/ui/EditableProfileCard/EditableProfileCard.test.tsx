import { fireEvent, screen } from '@testing-library/react'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'
import { EditableProfileCard } from './EditableProfileCard'
import { Profile } from '@/entities/Profile'
import { Currency } from '@/entities/Currency'
import { Country } from '@/entities/Country'
import { ProfileReducer } from '../../model/slice/profileSlice'
import userEvent from '@testing-library/user-event'
import { $api } from '@/shared/api/api'

const data: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 17,
    currency: Currency.USD,
    country: Country.Russia,
    city: 'Znamensk',
    username: 'admin123',
}

const options = {
    iniitialState: {
        profile: {
            readonly: true,
            data,
            form: data,
        },
        user: {
            authData: { id: '1' },
        },
    },
    asyncReducers: { profile: ProfileReducer },
}

describe('feature/EditableProfileCard', () => {
    test('Readonly mode change', async () => {
        componentRender(
            <EditableProfileCard id="1" />,
            options
        )

        await userEvent.click(
            screen.getByTestId(
                'EditableProfileCardHeader.EditButton'
            )
        )

        expect(
            screen.getByTestId(
                'EditableProfileCardHeader.CancelButton'
            )
        ).toBeInTheDocument()
    })

    test('After cancel changes have to null', async () => {
        componentRender(
            <EditableProfileCard id="1" />,
            options
        )

        await userEvent.click(
            screen.getByTestId(
                'EditableProfileCardHeader.EditButton'
            )
        )

        await userEvent.clear(
            screen.getByTestId(
                'EditableProfileCard.firstname'
            )
        )
        await userEvent.clear(
            screen.getByTestId(
                'EditableProfileCard.lastname'
            )
        )

        await userEvent.type(
            screen.getByTestId(
                'EditableProfileCard.firstname'
            ),
            'another firstname'
        )
        await userEvent.type(
            screen.getByTestId(
                'EditableProfileCard.lastname'
            ),
            'another lastname'
        )

        expect(
            screen.getByTestId(
                'EditableProfileCard.firstname'
            )
        ).toHaveValue('another firstname')
        expect(
            screen.getByTestId(
                'EditableProfileCard.lastname'
            )
        ).toHaveValue('another lastname')

        await userEvent.click(
            screen.getByTestId(
                'EditableProfileCardHeader.CancelButton'
            )
        )

        expect(
            screen.getByTestId(
                'EditableProfileCard.firstname'
            )
        ).toHaveValue('admin')
        expect(
            screen.getByTestId(
                'EditableProfileCard.lastname'
            )
        ).toHaveValue('admin')
    })

    test('Error of validation', async () => {
        componentRender(
            <EditableProfileCard id="1" />,
            options
        )

        await userEvent.click(
            screen.getByTestId(
                'EditableProfileCardHeader.EditButton'
            )
        )

        await userEvent.clear(
            screen.getByTestId(
                'EditableProfileCard.firstname'
            )
        )

        await userEvent.click(
            screen.getByTestId(
                'EditableProfileCardHeader.SaveButton'
            )
        )

        expect(
            screen.getByTestId(
                'EditableProfileCard.Error.Paragraph'
            )
        ).toBeInTheDocument()
    })

    test('Without Error of validation have to go PUT request', async () => {
        const mockPutReq = jest.spyOn($api, 'put')
        
        componentRender(
            <EditableProfileCard id="1" />,
            options
        )

        await userEvent.click(
            screen.getByTestId(
                'EditableProfileCardHeader.EditButton'
            )
        )

        await userEvent.clear(
            screen.getByTestId(
                'EditableProfileCard.firstname'
            )
        )

        await userEvent.type(
            screen.getByTestId(
                'EditableProfileCard.firstname'
            ),
            'another firstname'
        )

        await userEvent.click(
            screen.getByTestId(
                'EditableProfileCardHeader.SaveButton'
            )
        )

        expect(mockPutReq).toHaveBeenCalled()
    })
})
