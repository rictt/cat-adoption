import Base from './base'
import catModel from './cat'
import { Cat } from '../types/model'

const app = getApp()
let $collection = 'application'

class ApplicationModel extends Base {

  constructor() {
    super($collection)
  }

  async find(form) {
    const result = await this.model.where({
      ...form
    }).get()
    return result.data
  }

  async insert(form) {
    const data = await this.find(form)
    if (data && data.length) {
      throw '已存在，重复提交'
    }
    form.createTime = Date.now()
    this.model.add({
      data: form
    })
  }


  async getList(params = { pageSize: 5, pageNum: 1 }): Promise<Cat[]> {
    const { pageSize, pageNum } = params
    const { data } = await this.model
      .where({ openId: app.globalData.openId })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    const tasks = []
    data.forEach(item => {
      const { catId } = item
      tasks.push(catModel.getCat(catId))
    })

    const catDetails = await Promise.all(tasks)
    
    data.forEach((item, index) => {
      const catDetail = catDetails[index]
      const { desc, imgList } = catDetail
      item.desc = desc || '获取失败，请稍后重试喔'
      item.imgList = imgList || []
    })

    return data
  }

}


export default new ApplicationModel()