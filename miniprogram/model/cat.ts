import Base from './base'
import { Cat } from '../types/model'
import applicationModel from './application'

const app = getApp()

let $collection = 'cat'

class CatModel extends Base {

  constructor() {
    super($collection)
  }

  async insert(form) {
    form.createTime = Date.now()
    this.model.add({
      data: form
    })
  }

  async getList(params = { pageSize: 5, pageNum: 1, city: [] }): Promise<Cat[]> {
    let { pageSize, pageNum, city } = params
    console.log("query params")
    console.log(params)
    let model = this.model
    if (city) {
      model = await model.where({ adoptionAddress: city })
    }
    const { data } = await model
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize)
      .get()

    console.log("query result")
    console.log(data)
    return data
    // let model = this.model
  }

  async getCat(id): Promise<Cat|undefined> {
    const { data } = await this.model.where({ _id: id }).get()
    if (data && data.length) {
      const applicationRecord = await applicationModel.find({ 
        catId: id, openId: app.globalData.openId
      })
      if (applicationRecord && applicationRecord.length) {
        data[0].isApply = true
      }
      return data[0]
    }

    return undefined
  }
}


export default new CatModel()