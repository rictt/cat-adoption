import catModel from '../../model/cat'
import applicationModel from '../../model/application'

const app = getApp()

Page({
  data: {
    bottom: app.globalData.safeAreaHeight,
    catId: null,
    applyModalVisible: false,
    applySuccessModal: false,
    cat: {}
  },

  onLoad(options) {
    if (options.id) {
      this.setData({
        catId: options.id
      })
      this.getCatDetail()
    }
  },

  async getCatDetail() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    const id = this.data.catId
    const data = await catModel.getCat(id)
    this.setData({
      cat: data
    })
    setTimeout(() => {
      wx.hideLoading();
    }, 1000)
  },

  onClickApply() {
    if (this.data.cat.isApply) {
      this.setData({
        applySuccessModal: true
      })
    } else {
      this.setData({
        applyModalVisible: true
      })
    }
  },

  async onConfirm() {
    wx.showLoading({
      title: '正在提交',
      mask: true,
    })

    let error
    try {
      await applicationModel.insert({
        catId: this.data.cat._id,
        openId: app.globalData.openId
      })
    } catch (e) {
      error = e
      wx.showToast({
        title: e,
        icon: 'none',
        duration: 1500,
        mask: false,
      });
    } finally {
      wx.hideLoading();
    }
    
      
    this.setData({
      applyModalVisible: false,
      applySuccessModal: !error
    })
  },
  onCopy() {
    wx.setClipboardData({
      data: this.data.cat.contact,
      success: (result) => {
        wx.showToast({
          title: '复制成功',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            setTimeout(() => {
              this.setData({
                applySuccessModal: false
              })
            }, 500)
          },
          fail: () => {},
          complete: () => {}
        });
          
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

  onReady() {

  },

  onShow() {

  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },


  onShareAppMessage() {

  }
})