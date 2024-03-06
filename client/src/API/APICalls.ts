import axios, { AxiosResponse } from 'axios'

// axios setup
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 6000
//axios.defaults.withCredentials = true

const validStatus: number[] = [200, 201, 204]

// *************** AXIOS REQUEST ***************

export const getRequest = async (url: string) => {
  const res: AxiosResponse = await axios.get(url)

  if (validStatus.includes(res.status)) {
    return res.data
  } else {
    throw res.status
  }
}
