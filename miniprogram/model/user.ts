import { User } from '/types/model'


class UserModel {
  $collection = 'user'
  db = undefined
  model = undefined

  getModel() {
    let db = this.db
    if (!db) {
      this.db = wx.cloud.database()
    }
    let model = this.model
    if (!model) {
      this.model = this.db.collection(this.$collection)
    }
    return this.model
  }

  login() {
    return this.getModel().get()
  }
  
  async getUserInfo(openId): Promise<User> {
    const result = await this.getModel().where({ openId }).get()
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
      const flag = await this.getModel().add({
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