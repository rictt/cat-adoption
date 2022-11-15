import Base from './base'
import { Cat } from '../types/model'

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
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize)
      .get()

    data.forEach(item => {
      item.tags = ["小公主", "很粘人", "乖巧", "已打疫苗"]
    });

    return data
  }

  async getCat(id): Promise<Cat|undefined> {
    const { data } = await this.model.where({ _id: id }).get()
    if (data && data.length) {
      return data[0]
    }
    return undefined
  }
}


export default new ApplicationModel()