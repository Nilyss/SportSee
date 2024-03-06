export default class UserModel {
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

  constructor(data: {
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
  }) {
    this.id = data.id
    this.score = data.score
    this.userInfos = data.userInfos
    this.keyData = data.keyData
  }
}
