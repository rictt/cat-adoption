import Base from './base'
import { Cat } from '../types/model'

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


export default new CatModel()