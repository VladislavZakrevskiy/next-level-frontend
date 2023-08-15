import { Navbar } from 'widgets/Navbar'
import { Suspense } from 'react'
import { useTheme } from './providers/ThemeProvider'
import { cn } from '../shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { Sidebar } from '../widgets/Sidebar'

const App = () => {
    const { theme } = useTheme()

    return (
        <div className={cn('app', {}, [theme])}>
            <Suspense fallback={<div>Loading...</div>}>
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
