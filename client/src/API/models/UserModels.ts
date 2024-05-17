export interface UserInfos {
  id: number
  userInfos: {
    firstName: string
    lastName: string
    age: number
  }
  score: number
  keyData: {
    calorieCount: number
    proteinCount: number
    carbohydrateCount: number
    lipidCount: number
  }
}

export interface UserActivity {
  userId: number
  sessions: Array<{ day: string; kilogram: number; calories: number }>
}

export interface UserAverageSession {
  userId: number
  sessions: Array<{ day: number; sessionLength: number }>
}

export interface UserPerformance {
  userId: number
  kind: { [key: number]: string }
  data: Array<{ value: number; kind: number }>
}

export interface UserModel {
  userInfos: UserInfos
  userActivity: UserActivity
  userAverageSession: UserAverageSession
  userPerformance: UserPerformance
}
