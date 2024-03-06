import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// context
import { UserProvider } from './context/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <App />
  </UserProvider>,
)
