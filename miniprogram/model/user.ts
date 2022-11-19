import Base from './base'
import { User } from '/types/model'

const app = getApp()

let $collection = 'user'

class UserModel extends Base {

  constructor() {
    super($collection)
  }

  login() {
    return this.model.get()
  }
  
  async getUserInfo(openId = app.globalData.openId): Promise<User> {
    const result = await this.model.where({ openId }).get()
    const { data } = result
    if (data && data[0]) {
      return data[0]
    }
    return null
  }

  async insert(userInfo: User): Promise<boolean> {
    const { openId } = userInfo
    const result = await this.getUserInfo(openId)
    if (!result) {
      const flag = await this.model.add({
        data: {
          ...userInfo,
          createTime: Date.now()
        }
      })
      console.log('add flag: ', flag)
    } else {
      return false
    }
  }

  async addFavorite(catId: string) {
    const userInfo = await this.getUserInfo()
    let { favoriteList } = userInfo
    console.log("userInfo")
    console.log(userInfo)
    if (!favoriteList) {
      favoriteList = []
    }
    favoriteList.push(catId)
    const result = await this.model
      .where({ openId: app.globalData.openId })
      .update({
        data: {
          favoriteList: favoriteList
        }
      })
    return this.isOk(result)
  }
}

export default new UserModel()