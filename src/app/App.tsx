import { Navbar } from 'widgets/Navbar'
import { Suspense } from 'react'
import { useTheme } from './providers/ThemeProvider'
import { cn } from '../shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { Sidebar } from '../widgets/Sidebar'
import { PageLoader } from 'widgets/PageLoader'

const App = () => {
    const { theme } = useTheme()

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
