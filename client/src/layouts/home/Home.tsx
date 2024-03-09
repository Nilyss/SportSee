// style
import './home.scss'

// types
import {  ReactElement } from 'react'
import { IUserContext } from '../../context/UserContext.tsx'
import { NavigateFunction } from 'react-router-dom'

// context
import { UserContext } from '../../context/UserContext.tsx'

// hooks
import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Home(): ReactElement {
  const {
    getUser,
    user,
    getUserActivity,
    activity,
    getUserAverageSessions,
    averageSessions,
    getUserPerformance,
    performance
  }: IUserContext = useContext(UserContext)
  const userID: string | undefined = useParams().id
  const navigate: NavigateFunction = useNavigate()

  useEffect((): void => {
    async function getUserDatas(userID: string): Promise<void> {
        await getUser(userID)
        if (user) {
          await getUserActivity(userID)
          await getUserAverageSessions(userID)
          await getUserPerformance(userID)
        } else {
          navigate('/login')
        }
      }
    userID && getUserDatas(userID)
  }, [])

  return (
    <main className={'home'}>
      <h1>{user?.userInfos.firstName}</h1>
      <h2>{activity?.sessions[0].day}</h2>
      <h2>{averageSessions?.sessions[0].sessionLength}</h2>
      <h2>{performance?.data[0].value}</h2>
    </main>
  )
}
