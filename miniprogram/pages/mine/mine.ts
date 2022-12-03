import userModel from "../../model/user"

const app = getApp();
  
Page({
  data: {
    isAuth: app.globalData.isAuth,
    backgroundColor: '#ffa766',
    nickName: '点击登录',
    createTime: '请先登录',
    avatarUrl: "",
  },
  
  onShow() {
    this.getTabBar && this.getTabBar().setData({ active: 2 })
  },

  onLoad() {
    this.onLogin()
  },

 
  onLogin() {
    app.getUserInfo()
      .then(res => {
        console.log(res)
        const { nickName, avatarUrl, createTime } = res
        this.setData({
          isAuth: true,
          nickName,
          avatarUrl,
          createTime
        })
      })
  },

  async goToFavoritePage() {
    await app.getUserInfo()
    wx.navigateTo({
      url: '/pages/favorite/favorite',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },

  async goToApplyRecordPage() {
    await app.getUserInfo()
    wx.navigateTo({
      url: '/pages/apply-list/apply-list',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },

  async goToSendRecordPage() {
    await app.getUserInfo()
    wx.navigateTo({
      url: '/pages/send-list/send-list',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },

  onShareAppMessage() {
    return {
      title: '送养须知【小狸花一家】',
      path: '/pages/find-adoption/find-adoption',
      imageUrl: ''
    }
  }
})