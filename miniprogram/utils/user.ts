const app = getApp()

export const getOpenId = () => {
  if (app && app.globalData && app.globalData.openId) {
    return app.globalData.openId
  }

  return wx.getStorageSync('openId');
}