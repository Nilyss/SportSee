import { isOnProduction } from '../utils/scripts/utils.ts'

import axios from 'axios'
import {
  UserInfos,
  UserActivity,
  UserAverageSession,
  UserPerformance,
} from './models/UserModels'

// axios setup
axios.defaults.baseURL = isOnProduction ? 'http://localhost:3000' : '' // let the string empty to use JSON in public folder
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 6000
axios.defaults.withCredentials = !isOnProduction

// *************** AXIOS REQUEST ***************

export const fetchUserInfo = async (
  userId: string,
): Promise<{ data: UserInfos }> => {
  const userInfoEndpoint = isOnProduction ? `/user/${userId}` : '/userMainData.json'

  try {
    const response = await axios.get<{ data: UserInfos }>(userInfoEndpoint)
    return response.data
  } catch (error) {
    console.error(`Error fetching user info with ID ${userId}:`, error)
    throw error
  }
}

export const fetchUserActivity = async (
  userId: string,
): Promise<{ data: UserActivity }> => {
  const userActivityEndpoint = isOnProduction
    ? `/user/${userId}/activity`
    : '/userActivity.json'
  try {
    const response = await axios.get<{ data: UserActivity }>(
      userActivityEndpoint,
    )
    return response.data
  } catch (error) {
    console.error(`Error fetching user activity with ID ${userId}:`, error)
    throw error
  }
}

export const fetchUserAverageSession = async (
  userId: string,
): Promise<{ data: UserAverageSession }> => {
  const userAverageSessionEndpoint = isOnProduction
    ? `/user/${userId}/average-sessions`
    : '/userAverageSessions.json'
  try {
    const response = await axios.get<{ data: UserAverageSession }>(
      userAverageSessionEndpoint,
    )
    return response.data
  } catch (error) {
    console.error(
      `Error fetching user average session with ID ${userId}:`,
      error,
    )
    throw error
  }
}

export const fetchUserPerformance = async (
  userId: string,
): Promise<{ data: UserPerformance }> => {
  const userPerformanceEndpoint = isOnProduction
    ? `/user/${userId}/performance`
    : '/userPerformance.json'
  try {
    const response = await axios.get<{ data: UserPerformance }>(
      userPerformanceEndpoint,
    )
    return response.data
  } catch (error) {
    console.error(`Error fetching user performance with ID ${userId}:`, error)
    throw error
  }
}
