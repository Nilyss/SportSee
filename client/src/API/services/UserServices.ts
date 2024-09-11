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

const mapUserData = (
  userInfo: APIResponse<UserInfos>,
  userActivity: APIResponse<UserActivity>,
  userAverageSession: APIResponse<UserAverageSession>,
  userPerformance: APIResponse<UserPerformance>,
): UserModel => ({
  userInfos: userInfo.data,
  userActivity: userActivity.data,
  userAverageSession: userAverageSession.data,
  userPerformance: userPerformance.data,
})

export const getUserData = async (userId: string): Promise<UserModel> => {
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
      userInfo.data = Array.isArray(userInfo)
        ? userInfo.find((user: UserInfos) => user.id.toString() === userId)
        : null
      userActivity.data = Array.isArray(userActivity)
        ? userActivity.find(
            (user: UserActivity) => user.userId.toString() === userId,
          )
        : null
      userAverageSession.data = Array.isArray(userAverageSession)
        ? userAverageSession.find(
            (user: UserAverageSession) => user.userId.toString() === userId,
          )
        : null
      userPerformance.data = Array.isArray(userPerformance)
        ? userPerformance.find(
            (user: UserPerformance) => user.userId.toString() === userId,
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
