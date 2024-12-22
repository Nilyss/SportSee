import { isOnProduction } from '../../utils/scripts/utils.ts'
import {
  fetchUserInfo,
  fetchUserActivity,
  fetchUserAverageSession,
  fetchUserPerformance,
} from '../APICalls'
import {
  UserModel,
  UserInfos,
  UserActivity,
  UserAverageSession,
  UserPerformance,
} from '../models/UserModels'

interface APIResponse<T> {
  data: T
}

const normalizeUserInfos = (userInfo: UserInfos): UserInfos => ({
  ...userInfo,
  score: userInfo.score ?? userInfo.todayScore ?? 0,
})

const mapUserData = (
  userInfo: APIResponse<UserInfos>,
  userActivity: APIResponse<UserActivity>,
  userAverageSession: APIResponse<UserAverageSession>,
  userPerformance: APIResponse<UserPerformance>,
): UserModel => ({
  userInfos: normalizeUserInfos(userInfo.data),
  userActivity: userActivity.data,
  userAverageSession: userAverageSession.data,
  userPerformance: userPerformance.data,
})

export const getUserData = async (
  userId: string,
): Promise<UserModel | null> => {
  try {
    const [userInfo, userActivity, userAverageSession, userPerformance] =
      await Promise.all([
        fetchUserInfo(userId),
        fetchUserActivity(userId),
        fetchUserAverageSession(userId),
        fetchUserPerformance(userId),
      ])
    if (isOnProduction) {
      return mapUserData(
        userInfo,
        userActivity,
        userAverageSession,
        userPerformance,
      )
    } else {
      // declare as array to be able to use find, and avoid TS error
      const foundUserInfo: UserInfos = Array.isArray(userInfo)
        ? userInfo.find(
            (user: UserInfos): boolean => user.id.toString() === userId,
          )
        : null

      if (!foundUserInfo) {
        console.error(`User with ID ${userId} not found`)
        return null
      }

      userInfo.data = normalizeUserInfos(foundUserInfo)

      userActivity.data = Array.isArray(userActivity)
        ? userActivity.find(
            (user: UserActivity): boolean => user.userId.toString() === userId,
          )
        : null
      userAverageSession.data = Array.isArray(userAverageSession)
        ? userAverageSession.find(
            (user: UserAverageSession): boolean =>
              user.userId.toString() === userId,
          )
        : null
      userPerformance.data = Array.isArray(userPerformance)
        ? userPerformance.find(
            (user: UserPerformance): boolean =>
              user.userId.toString() === userId,
          )
        : null

      return {
        userInfos: userInfo.data,
        userActivity: userActivity.data,
        userAverageSession: userAverageSession.data,
        userPerformance: userPerformance.data,
      }
    }
  } catch (error) {
    console.error(`Error getting user data with ID ${userId}:`, error)
    throw error
  }
}
