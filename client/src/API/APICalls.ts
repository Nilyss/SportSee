import axios from 'axios'
import {
  UserInfos,
  UserActivity,
  UserAverageSession,
  UserPerformance,
} from './models/UserModels'

// axios setup
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 6000
//axios.defaults.withCredentials = true

// *************** AXIOS REQUEST ***************

export const fetchUserInfo = async (
  userId: string,
): Promise<{ data: UserInfos }> => {
  try {
    const response = await axios.get<{ data: UserInfos }>(`/user/${userId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching user info with ID ${userId}:`, error)
    throw error
  }
}

export const fetchUserActivity = async (
  userId: string,
): Promise<{ data: UserActivity }> => {
  try {
    const response = await axios.get<{ data: UserActivity }>(
      `/user/${userId}/activity`,
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
  try {
    const response = await axios.get<{ data: UserAverageSession }>(
      `/user/${userId}/average-sessions`,
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
  try {
    const response = await axios.get<{ data: UserPerformance }>(
      `/user/${userId}/performance`,
    )
    return response.data
  } catch (error) {
    console.error(`Error fetching user performance with ID ${userId}:`, error)
    throw error
  }
}
