import Base from './base'
import { User } from '/types/model'

let $collection = 'user'

class UserModel extends Base {

  constructor() {
    super($collection)
  }

  login() {
    return this.model.get()
  }
  
  async getUserInfo(openId): Promise<User> {
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
}

export default new UserModel()