// styles
import './utils/styles/global.scss'

// types
import { ReactElement } from 'react'

// hooks
import { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// context
import { UserContext } from './context/UserContext'

function App(): ReactElement {
  // get current hour and minutes
  const getCurrentHour = (): string => {
    const date: Date = new Date()
    return `${date.getHours()}:${date.getMinutes()}`
  }

  const { getUser } = useContext(UserContext)

  const userID: string = '18' // DEV

  useEffect((): void => {
    getUser(userID)
      .then(() =>
        console.log(
          `user data's successfully fetched at : ${getCurrentHour()}`,
        ),
      )
      .catch((err) =>
        console.error(
          `user data's failed to be  fetched at : ${getCurrentHour()} - ${err}`,
        ),
      )
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
