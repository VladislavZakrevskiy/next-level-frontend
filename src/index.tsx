import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './app/styles/index.scss'
import '@/shared/config/i18n/i18n'
import App from './app/App'
import { ThemeProvider } from './app/providers/ThemeProvider'
import { ErrorBoundary } from './app/providers/ErrorBoundary'
import { StoreProvider } from '@/app/providers/StoreProvider'

const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>
)
