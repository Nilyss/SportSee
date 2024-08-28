// types & models
import { ReactElement, Context, Dispatch, SetStateAction } from 'react'
import { UserModel } from '../API/models/UserModels.ts'

// services
import { getUserData } from '../API/services/UserServices'

export interface IUserContext {
  getUser: (id: string) => Promise<void>
  user: UserModel | null
}

// hooks
import { createContext, useState, ReactNode } from 'react'

export const UserContext: Context<IUserContext> = createContext<IUserContext>({
  getUser: async (): Promise<void> => {},
  user: null,
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

  const getUser = async (id: string): Promise<void> => {
    const userData: UserModel = await getUserData(id)
    setUser(userData)
  }

  return (
    <UserContext.Provider
      value={{
        getUser,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
