import { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from 'shared/config/i18n/i18n'
import { MemoryRouter } from 'react-router-dom'
import {
    StateSchema,
    StoreProvider,
} from 'app/providers/StoreProvider'
import { ReducersMapObject } from '@reduxjs/toolkit'

export interface ComponentRenderOptions {
    route?: string
    iniitialState?: DeepPartial<StateSchema>
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const componentRender = (
    component: ReactNode,
    options: ComponentRenderOptions,
) => {
    const { route = '/', iniitialState, asyncReducers } = options

    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider asyncReducers={asyncReducers} initialSchema={iniitialState}>
                <I18nextProvider i18n={i18n}>
                    {component}
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    )
}
