import Base from './base'

let $collection = 'apollo'

class ApolloModel extends Base {

  constructor() {
    super($collection)
  }

  async get() {
    const { data } = await this.model.get()
    if (!data || !data.length) {
      console.error('apllo data is not found!!!')
    }
    return data[0]
  }
}


export default new ApolloModel()