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


// layout
import Landing from './layouts/landing/Landing'
import Home from './layouts/home/Home'

function App(): ReactElement {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path={'/login'} element={<Landing />} />
        <Route path={'/home/:id'} element={<Home  />} />
      </Routes>
    </Router>
  )
}

export default App
