import { getUserAuthData } from 'entities/User'
import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

interface Props {
    children?: ReactNode
}

export const RequireAuth: FC<Props> = ({ children }) => {
    const auth = useSelector(getUserAuthData)
    const location = useLocation()

    if (!auth) {
        return (
            <Navigate
                to={RoutePath.main}
                state={{ from: location }}
                replace
            />
        )
    }

    return children
}
