const app = getApp()

Page({
  data: {

  },

  onShow() {
    this.getTabBar && this.getTabBar().setData({ active: 1 })
  },

  onLoad() {
  },

  async gotoFormPage() {
    try {
      await app.getUserInfo()
      wx.navigateTo({
        url: '/pages/find-adoption/find-adoption',
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
    } catch (error) {
      console.log(error)
    }
  }

 
})