import { getUserAuthData } from 'entities/User'
import { Suspense, memo, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import {
    AppRouteProps,
    routeConfig,
} from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader'
import { RequireAuth } from './RequireAuth'

export const AppRouter = memo(() => {
    const renderWithWrapper = useCallback(
        (route: AppRouteProps) => {
            const element = (
                <Suspense fallback={<PageLoader />}>
                    <div className="page-wrapper">
                        {route.element}
                    </div>
                </Suspense>
            )

            return (
                <Route
                    element={
                        route.authOnly ? (
                            <RequireAuth>
                                {element}
                            </RequireAuth>
                        ) : (
                            element
                        )
                    }
                    path={route.path}
                    key={route.path}
                />
            )
        },
        []
    )

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(routeConfig).map(
                    renderWithWrapper
                )}
            </Routes>
        </Suspense>
    )
})
