import applicationModel from '../../model/application'
import catModel from '../../model/cat'

Page({
  data: {
    cats: [],
    pageNum: 1,
    pageSize: 5
  },

  onLoad() {
    this.getList()
  },

  goToCatPage(e) {
    const { _id } = e.detail
    wx.navigateTo({
      url: '/pages/cat-detail/cat-detail?id=' + _id
    })
  },

  async getList() {
    if (this.data.loaded) return

    wx.showLoading({ title: '加载中' })
      
    const params = { pageNum: this.data.pageNum++, pageSize: this.data.pageSize }
    const data = await catModel.getSendList(params)
    data.forEach(item => {
      if (item.imgList &&item.imgList.length) {
        item.cover = item.imgList[0].url
      }
      item.status = item.status || 10
    })
    this.setData({
      cats: this.data.cats.concat(data),
      loaded: (!data || !data.length)
    })

    console.log('cats data')
    console.log(data)

    setTimeout(() => {
      wx.hideLoading();
    }, 500)
  },

  onReachBottom() {
    this.getList()
  }
})