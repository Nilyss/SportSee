// types & models
import { ReactElement, Context, Dispatch, SetStateAction } from 'react'
import {
  ActivityModel,
  AverageSessionsModel,
  UserModel,
  PerformanceModel,
} from '../API/models/UserModels.ts'

// services
import UserServices from '../API/services/UserServices'

export interface IUserContext {
  getUser: (id: string) => Promise<void>
  user: UserModel | null
  getUserActivity: (id: string) => Promise<void>
  activity: ActivityModel | null
  getUserAverageSessions: (id: string) => Promise<void>
  averageSessions: AverageSessionsModel | null
  getUserPerformance: (id: string) => Promise<void>
  performance: PerformanceModel | null
}

// hooks
import { createContext, useState, ReactNode } from 'react'

// Initialization
const userServices: UserServices = new UserServices()

export const UserContext: Context<IUserContext> = createContext<IUserContext>({
  getUser: async (): Promise<void> => {},
  user: null,
  getUserActivity: async (): Promise<void> => {},
  activity: null,

  getUserAverageSessions: async (): Promise<void> => {},
  averageSessions: null,

  getUserPerformance: async (): Promise<void> => {},
  performance: null,
})

export const UserProvider = ({
  children,
}: {
  children: ReactNode
}): ReactElement => {
  const [user, setUser]: [
    UserModel | null,
    Dispatch<SetStateAction<UserModel | null>>,
  ] = useState<UserModel | null>(null)

  const [activity, setActivity]: [
    ActivityModel | null,
    Dispatch<SetStateAction<ActivityModel | null>>,
  ] = useState<ActivityModel | null>(null)

  const [averageSessions, setAverageSessions]: [
    AverageSessionsModel | null,
    Dispatch<SetStateAction<AverageSessionsModel | null>>,
  ] = useState<AverageSessionsModel | null>(null)

  const [performance, setPerformance]: [
    PerformanceModel | null,
    Dispatch<SetStateAction<PerformanceModel | null>>,
  ] = useState<PerformanceModel | null>(null)

  const getUser = async (id: string): Promise<void> => {
    const userData: UserModel = await userServices.getUser(id)
    setUser(userData)
  }

  const getUserActivity = async (id: string): Promise<void> => {
    const userData: ActivityModel = await userServices.getUserActivity(id)
    setActivity(userData)
  }

  const getUserAverageSessions = async (id: string): Promise<void> => {
    const userData: AverageSessionsModel =
      await userServices.getUserAverageSessions(id)
    setAverageSessions(userData)
  }

  const getUserPerformance = async (id: string): Promise<void> => {
    const userData: PerformanceModel = await userServices.getUserPerformance(id)
    setPerformance(userData)
  }

  return (
    <UserContext.Provider
      value={{
        getUser,
        user,
        getUserActivity,
        activity,
        getUserAverageSessions,
        averageSessions,
        getUserPerformance,
        performance,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
