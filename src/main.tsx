import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { FinancialDataProvider } from './contexts/FinancialDataContext'

createRoot(document.getElementById("root")!).render(
	<FinancialDataProvider>
		<App />
	</FinancialDataProvider>
);

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js').catch((err) => {
			// Registering SW is optional in dev; log errors for debugging
			// eslint-disable-next-line no-console
			console.warn('ServiceWorker registration failed:', err);
		});
	});
}
