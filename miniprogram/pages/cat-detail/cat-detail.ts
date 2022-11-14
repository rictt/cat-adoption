import catModel from '../../model/cat'

const app = getApp()

Page({
  data: {
    bottom: app.globalData.safeAreaHeight,
    catId: null,
    applyModalVisible: false,
    cat: {}
  },

  onLoad(options) {
    if (options.id) {
      this.setData({
        catId: options.id
      })
      this.getCatDetail()
    }
  },

  async getCatDetail() {
    const id = this.data.catId
    const data = await catModel.getCat(id)
    console.log(data)
    this.setData({
      cat: data
    })
  },

  onClickApply() {
    console.log('click')
    console.log(this.data.cat)
    this.setData({
      applyModalVisible: true
    })
  },

  onConfirm() {
    this.setData({
      applyModalVisible: false
    })
  },

  onReady() {

  },

  onShow() {

  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },


  onShareAppMessage() {

  }
})