import applicationModel from '../../model/application'

Page({
  data: {
    cats: []
  },

  onLoad() {
    this.getList()
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

    setTimeout(() => {
      wx.hideLoading();
    }, 500)
  }
})