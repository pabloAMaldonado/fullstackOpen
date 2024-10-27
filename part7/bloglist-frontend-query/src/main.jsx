import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import { UserContextProvider } from './context/userContext'
import { NotiContextProvider } from './context/notiContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<UserContextProvider>
			<NotiContextProvider >
				<App />
			</NotiContextProvider>
		</UserContextProvider>
	</QueryClientProvider>
)
