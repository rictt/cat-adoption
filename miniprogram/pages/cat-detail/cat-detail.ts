import catModel from '../../model/cat'
import userModel from '../../model/user'
import applicationModel from '../../model/application'

const app = getApp()

Page({
  data: {
    bottom: app.globalData.safeAreaHeight,
    catId: null,
    applyModalVisible: false,
    applySuccessModal: false,
    cat: {},
    countDown: 10,
    countDownText: "(9s)",
    canNextConfirm: false,
    isFavorite: false
  },

  onShareAppMessage() {
    const { cat } = this.data
    const { _id, breed, adoptionAddress, age, name } = cat
    return {
      title: `【${adoptionAddress[1]}】的${age}${breed}毛孩子${name}正在等待领养`,
      path: '/pages/cat-detail/cat-detail?id=' + _id,
      imageUrl: ''
    }
  },


  async onLoad(options) {
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
    let isFavorite = false
    try {
      const { favoriteList } = await app.getUserInfo(false)
      isFavorite = favoriteList && favoriteList.includes && favoriteList.includes(id)
    } catch (e) {
      console.log(e)
    }

    this.setData({
      cat: data,
      isFavorite
    })

    setTimeout(() => {
      wx.hideLoading();
    }, 1000)
  },

  async onClickApply() {
    if (this.timer) {
      this.timer = null
      clearTimeout(this.timer)
      this.setData({
        countDown: 9
      })
    }
    try {
      await app.getUserInfo()
      if (this.data.cat.isApply) {
        this.setData({
          applySuccessModal: true
        })
      } else {
        this.startCountDown()
        this.setData({
          countDown: 9,
          applyModalVisible: true
        })
      }
    } catch (e) {
      console.log(e)
    }
  },

  startCountDown() {
    let val = this.data.countDown--
    clearTimeout(this.timer)
    this.timer = null
    if (val <= 0) {
      this.setData({
        countDownText: '',
        countDown: -1,
        canNextConfirm: true
      })
      return
    }
    this.setData({
      countDown: this.data.countDown--,
      countDownText: `(${val}s)`
    })
    this.timer = setTimeout(() => {
      this.startCountDown()
    }, 1000)
  },

  async onConfirm() {
    if (!this.data.canNextConfirm) return
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
      applySuccessModal: !error,
      'cat.isApply': true
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

  async addFavorite() {
    if (this.data.isFavorite) return
    wx.showLoading({
      mask: true,
    });
    try {
      await app.getUserInfo()
      await userModel.addFavorite(this.data.catId)
      this.setData({
        isFavorite: true
      })
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        wx.hideLoading();
      }, 500)
    }
  }
})