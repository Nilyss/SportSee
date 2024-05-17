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

    return mapUserData(
      userInfo,
      userActivity,
      userAverageSession,
      userPerformance,
    )
  } catch (error) {
    console.error(`Error getting user data with ID ${userId}:`, error)
    throw error
  }
}
