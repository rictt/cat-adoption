
import { User } from '/types/model'

App({
  globalData: {
    safeAreaHeight: 0,
    statusBarHeight: 0,
    capsuleHeight: 0,
    capsuleWidth: 0,
    appId: undefined,
    openId: undefined,
    userInfo: null
  },

  onLaunch: async function () {
    if (!wx.cloud) {
      return console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    }

    console.log('wx.cloud loaded')
    wx.cloud.init({
      env: 'cat-adoption-dev-5fjfdgk22f7800a',
      traceUser: true,
    });
    
    this.getOpenId()
    this.getPageInfo()

    this.getUser()
  },

  getOpenId() {
    const openId = wx.getStorageSync('openId');
    if (openId) {
      this.globalData.openId = openId
      this.getUser()
      return
    }
      
    wx.cloud.callFunction({
      name: 'get-open-id',
      success: (response) => {
        const result = response.result
        const { openid, appid } = result
        wx.setStorageSync('openId', openid);
        this.globalData.openId = openid
        this.globalData.appId = appid
        this.getUser()
      },
      fail: (e) => {
        console.log('get open id fail')
        console.log(e)
      }
    })
  },

  async getUser(): Promise<User> {
    // if (this.globalData.userInfo) {
    //   return this.globalData.userInfo
    // }
    const userModel = require('./model/user').default
    const result = await userModel.getUserInfo(this.globalData.openId)
    if (result) {
      this.globalData.userInfo = result
      wx.setStorageSync('userInfo', JSON.stringify(result))
    }
    return result || this.globalData.userInfo
  },

  getPageInfo() {
    // https://www.cnblogs.com/chenwolong/p/navigationBar.html，很详细，推荐！
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync()
    console.log("getSystemInfo result :", systemInfo)
    console.log(menuButtonInfo)
    console.log("menuButtonInfo result: ", menuButtonInfo)

    // 胶囊整块的高度 = 胶囊上下边距 + 胶囊本身高度
    const capsuleHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height
    this.globalData.safeAreaHeight = systemInfo.safeArea.bottom - systemInfo.safeArea.height
    this.globalData.statusBarHeight = systemInfo.statusBarHeight
    this.globalData.capsuleHeight = capsuleHeight
  }
});
