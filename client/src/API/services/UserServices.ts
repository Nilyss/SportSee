// types
import { AxiosResponse } from 'axios'

// query
import { getRequest } from '../APICalls.ts'

// models
import UserModel from '../models/UserModel.ts'

export default class UserServices {
  async getUsers(id: string): Promise<UserModel> {
    const res: AxiosResponse = await getRequest(`/user/${id}`)
    return new UserModel(res.data)
  }
}
