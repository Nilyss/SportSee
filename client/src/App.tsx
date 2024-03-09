// styles
import './utils/styles/global.scss'

// types
import { ReactElement } from 'react'

// hooks
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

// context
import { UserContext } from './context/UserContext'

// layout
import Landing from './layouts/landing/Landing'

function App(): ReactElement {
  // get current hour and minutes


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path={'/login'} element={<Landing />} />
      </Routes>
    </Router>
  )
}

export default App
