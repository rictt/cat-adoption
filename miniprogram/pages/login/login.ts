import userModel from "../../model/user"

const app = getApp()

Page({
  data: {
    isAuth: false,
    userInfo: null
  },

  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  async setUserInfoToCloud(userInfo) {
    await userModel.insert({ 
      ...userInfo, 
      openId: app.globalData.openId,
      createTime: Date.now()
    })
  },

  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.showToast({
          title: '登录成功',
          icon: 'none',
          image: '',
          duration: 1500,
        })
        const userInfo = res.userInfo
        this.setData({
          isAuth: true,
          userInfo: userInfo
        })
        this.setUserInfoToCloud(userInfo)
        app.setUserInfo(userInfo)
        this.goBack()
      }
    })
  },

  getUserInfo(e) {
    console.log(e)
  }
})