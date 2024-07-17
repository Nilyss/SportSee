// style
import './home.scss'

// types
import { ReactElement } from 'react'
import { IUserContext } from '../../context/UserContext.tsx'
import { NavigateFunction } from 'react-router-dom'

// context
import { UserContext } from '../../context/UserContext.tsx'

// hooks
import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// components
import Header from '../../components/header/Header.tsx'
import Aside from '../../components/aside/Aside.tsx'
import BarChart from '../../components/barChart/BarChart.tsx'
import LineChart from '../../components/lineChart/LineChart.tsx'

export default function Home(): ReactElement {
  const { getUser, user }: IUserContext = useContext(UserContext)
  const userID: string = useParams().id!
  const navigate: NavigateFunction = useNavigate()

  useEffect((): void => {
    async function getUserDatas(userID: string): Promise<void> {
      await getUser(userID)
      if (!user) {
        navigate('/login')
      }
    }
    userID && getUserDatas(userID)
  }, [])

  const EmptyMessage = (): ReactElement => {
    return <p>Aucune donnée disponible</p>
  }

  return (
    <>
      <Header />
      <main className={'home'}>
        <Aside />
        <article>
          <section>
            <h1>
              Bonjour{' '}
              <span className={'titleColor'}>
                {user?.userInfos.userInfos.firstName}
              </span>
            </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
          </section>
          <section>
            {user?.userActivity.sessions ? (
              <BarChart datas={user.userActivity.sessions} />
            ) : (
              <EmptyMessage />
            )}
          </section>
          <section>
            {user?.userAverageSession.sessions ? (
              <LineChart datas={user.userAverageSession.sessions} />
            ) : (
              <EmptyMessage />
            )}
          </section>
        </article>
      </main>
    </>
  )
}
