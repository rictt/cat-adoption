import catModel from '../../../model/cat'

Component({
  properties: {
    detail: {
      type: Object,
      value: null
    }
  },

  data: {

  },

  methods: {
    async hideInfo() {
      wx.showLoading({ title: '保存中' })
      const result = await catModel.updateStatus(this.data.detail._id, 11)
      console.log(result)
      wx.hideLoading()
      this.setData({
        'detail.status': 11
      })
    },
    async showInfo() {
      wx.showLoading({ title: '保存中' })
      const result = await catModel.updateStatus(this.data.detail._id, 10)
      console.log(result)
      wx.hideLoading()
      this.setData({
        'detail.status': 10
      })
    }
  }
})
