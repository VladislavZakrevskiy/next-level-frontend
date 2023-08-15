import { useTheme } from './providers/ThemeProvider'
import { cn } from '../shared/lib/classNames'
import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense } from 'react'

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
