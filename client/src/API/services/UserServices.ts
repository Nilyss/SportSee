// types
import {  AxiosResponse } from 'axios'

// query
import { getRequest } from '../APICalls.ts'

// models
import { ActivityModel, AverageSessionsModel, PerformanceModel, UserModel } from '../models/UserModels.ts'

export default class UserServices {
  async getUser(id: string): Promise<UserModel> {
    const res: AxiosResponse = await getRequest(`/user/${id}`)
    return new UserModel(res.data)
  }

  async getUserActivity(id: string): Promise<ActivityModel> {
    const res: AxiosResponse = await getRequest(`/user/${id}/activity`)
    return new ActivityModel(res.data)
  }

  async getUserAverageSessions(id: string): Promise<AverageSessionsModel> {
    const res: AxiosResponse = await getRequest(`/user/${id}/average-sessions`)
    return new AverageSessionsModel(res.data)
  }

  async getUserPerformance(id: string): Promise<PerformanceModel> {
    const res: AxiosResponse = await getRequest(`/user/${id}/performance`)
    return new PerformanceModel(res.data)
  }
}
