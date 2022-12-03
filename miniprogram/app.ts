
import user from './model/user';
import { User } from '/types/model'

App({
  globalData: {
    isAuth: false,
    safeAreaHeight: 0,
    statusBarHeight: 0,
    capsuleHeight: 0,
    capsuleWidth: 0,
    appId: undefined,
    openId: undefined,
    userInfo: null
  },

  getUserInfo(goLogin = true): Promise<Object> {
    return new Promise(async (resolve, rejct) => {
      const { isAuth, userInfo } = this.globalData
      if (!isAuth && !userInfo) {
        const userModel = require('./model/user').default
        const result = await userModel.getUserInfo(this.globalData.openId)
        if (!result) {
          if (goLogin) {
            wx.navigateTo({ url: "/pages/login/login" })
          }
          return rejct()
        }
        this.setUserInfo(result)
      } else {
        resolve(userInfo)
      }
    })
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
    this.getUserInfo(false)
  },
  
  getOpenId() {
    const openId = wx.getStorageSync('openId');
    if (openId) {
      this.globalData.openId = openId
      this.getUserInfo(false)
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
        this.getUserInfo(false)
      },
      fail: (e) => {
        console.log('get open id fail')
        console.log(e)
      }
    })
  },

  async setUserInfo(data) {
    this.globalData.userInfo = data
    this.globalData.isAuth = true
    wx.setStorageSync('userInfo', JSON.stringify(data))
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
