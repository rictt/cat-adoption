import catModel from '../../model/cat'

const app = getApp()

Page({
  data: {
    cats: []
  },

  onLoad() {
    this.getFavoriteList()
  },

  goToCatPage(e) {
    const { id } = e.detail
    wx.navigateTo({
      url: '/pages/cat-detail/cat-detail?id=' + id
    })
  },

  async getFavoriteList() {
    wx.showLoading({
      mask: true,
    });
      
    const userInfo = await app.getUser()
    const { favoriteList } = userInfo
    
    const tasks = []

    favoriteList.forEach(item => {
      tasks.push(catModel.getCat(item))
    })

    const result = await Promise.all(tasks)
    const cats = result.map(e => {
      return {
        id: e._id,
        desc: e.desc,
        cover: e.imgList && e.imgList[0].url
      }
    })
    wx.hideLoading()
    this.setData({
      cats
    })
  }
})