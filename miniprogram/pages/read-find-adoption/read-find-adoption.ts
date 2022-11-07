// pages/read-find-adoption/read-find-adoption.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
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