import { Navbar } from 'widgets/Navbar'
import { Suspense, useEffect } from 'react'
import { useTheme } from './providers/ThemeProvider'
import { cn } from '../shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { Sidebar } from '../widgets/Sidebar'
import { PageLoader } from 'widgets/PageLoader'
import { useDispatch } from 'react-redux'
import { UserActions } from 'entities/User'

const App = () => {
    const { theme } = useTheme()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(UserActions.initAuthData())
    }, [dispatch])

    return (
        <div className={cn('app', {}, [theme])}>
            <Suspense fallback={<PageLoader/>}>
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )
}

export default App
