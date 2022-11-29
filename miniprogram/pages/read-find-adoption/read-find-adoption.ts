Page({
  data: {

  },

  onShow() {
    this.getTabBar && this.getTabBar().setData({ active: 1 })
  },

  onLoad() {
  },

  gotoFormPage() {
    wx.navigateTo({
      url: '/pages/find-adoption/find-adoption',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  }

 
})