import userModel from "../../model/user"

const app = getApp();
  
Page({
  data: {
    backgroundColor: '#ffa766',
    nickName: '点击登录',
    createTime: '请先登录',
    avatarUrl: "",
  },

  async onLoad() {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
    } else {
      userInfo = app.globalData.userInfo
    }
    if (userInfo) {
      this.setData({
        nickName: userInfo.nickName,
        createTime: userInfo.createTime,
        avatarUrl: userInfo.avatarUrl,
      })
    } else {
      this.onLogin()
    }
  },
  onLogin() {
    wx.login({
      timeout: 10000,
      success: (result) => {
        const code = result.code
        wx.getUserInfo({
          withCredentials: 'false',
          lang: 'zh_CN',
          desc: '用于完善用户资料',
          timeout:10000,
          success: async (result) => {
            const { userInfo } = result
            const { nickName, avatarUrl } = userInfo
            this.setData({
              nickName,
              avatarUrl,
              createTime: Date.now()
            })
            const flag = await userModel.insert({ ...userInfo, openId: app.globalData.openId })
            if (flag) {
              wx.showToast({
                title: '登录成功',
                icon: 'none'
              })
            }
          },
          fail: () => {},
          complete: () => {}
        });
          
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

  goToFavoritePage() {
    wx.navigateTo({
      url: '/pages/favorite/favorite',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },

  goToApplyRecordPage() {
    wx.navigateTo({
      url: '/pages/apply-list/apply-list',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },

  goToSendRecordPage() {
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