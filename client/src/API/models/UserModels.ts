export class UserModel {
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

export class ActivityModel {
  userId: number
  sessions: [
    {
      day: string
      kilogram: number
      calories: number
      protein: number
      carbohydrate: number
      lipid: number
    },
  ]

  constructor(data: {
    userId: number
    sessions: [
      {
        day: string
        kilogram: number
        calories: number
        protein: number
        carbohydrate: number
        lipid: number
      },
    ]
  }) {
    this.userId = data.userId
    this.sessions = data.sessions
  }
}

export class AverageSessionsModel {
  userId: number
  sessions: [
    {
      day: number
      sessionLength: number
    },
  ]
  constructor(data: {
    userId: number
    sessions: [
      {
        day: number
        sessionLength: number
      },
    ]
  }) {
    this.userId = data.userId
    this.sessions = data.sessions
  }
}

export class PerformanceModel {
  userId: number
  kind: {
    [key: number]: string
  }
  data: [
    {
      value: number
      unit: string
    },
  ]
  constructor(data: {
    userId: number
    kind: {
      [key: number]: string
    }
    data: [
      {
        value: number
        unit: string
      },
    ]
  }) {
    this.userId = data.userId
    this.kind = data.kind
    this.data = data.data
  }
}
