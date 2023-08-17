import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createReduxStore } from '../config/store'
import { StateSchema } from '../config/StateSchema'

interface Props {
    children: ReactNode,
    initialSchema?: StateSchema
}

export const StoreProvider: FC<Props> = ({ children, initialSchema }) => {
    const store = createReduxStore(initialSchema)

    return <Provider store={store}>{children}</Provider>
}
