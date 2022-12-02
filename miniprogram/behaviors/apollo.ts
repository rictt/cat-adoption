
import apolloModel from '../model/apollo'

let _apolloData = null

export default Behavior({
  data: {
    apolloData: {
      indexSwiperList: []
    }
  },

  attached() {
    if (_apolloData) {
      this.setData({
        apolloData: _apolloData
      })
    } else {
      this.getApolloData()
    }
  },

  methods: {
    async getApolloData() {
      const result = await apolloModel.get()
      this.setData({
        apolloData: result
      })
      
      return result
    }
  }
})