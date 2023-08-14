import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { LazyAboutPage } from 'pages/AboutPage'
import { LazyMainPage } from 'pages/MainPage'
import { useTheme } from './providers/ThemeProvider'
import { cn } from '../shared/lib/classNames'
import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'

const App = () => {
	const { theme, toggleTheme } = useTheme()

	return (
		<div className={cn('app', {}, [theme])}>
			<button onClick={toggleTheme}>TOGGLE</button>
			<Navbar/>
			<AppRouter/>
		</div>
	)
}

export default App
