import applicationModel from '../../model/application'

Page({
  data: {
    cats: []
  },

  onLoad() {
    this.getList()
  },

  goToCatPage(e) {
    const { catId } = e.detail
    wx.navigateTo({
      url: '/pages/cat-detail/cat-detail?id=' + catId
    })
  },

  async getList() {
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
    const data = await applicationModel.getList()
    data.forEach(item => {
      if (item.imgList &&item.imgList.length) {
        item.cover = item.imgList[0].url
      }
    })
    this.setData({
      cats: data
    })

    console.log('cats data')
    console.log(data)

    setTimeout(() => {
      wx.hideLoading();
    }, 500)
  }
})