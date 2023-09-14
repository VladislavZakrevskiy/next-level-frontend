import { Navbar } from '@/widgets/Navbar'
import { Suspense, useEffect } from 'react'
import { cn } from '../shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { Sidebar } from '../widgets/Sidebar'
import { PageLoader } from '@/widgets/PageLoader'
import { useDispatch, useSelector } from 'react-redux'
import { UserActions, getUserInited, useJsonSettingsByKey } from '@/entities/User'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'

const App = () => {
    const { theme } = useTheme()
    const dispatch = useDispatch()
    const _inited = useSelector(getUserInited)

    useEffect(() => {
        dispatch(UserActions.initAuthData())
    }, [dispatch])

    return (
        <div className={cn('app', {}, [theme])}>
            <Suspense fallback={<PageLoader />}>
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {_inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    )
}

export default App
