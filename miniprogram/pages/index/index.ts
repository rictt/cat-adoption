import catModel from '../../model/cat'
import { areaList } from '@vant/area-data'
import apolloBehavior from '../../behaviors/apollo'

Page({
  behaviors: [apolloBehavior],

  data: {
    areaList,
    showAreaList: false,
    queryCityCode: [],
    areaText: '选择城市',
    cats: [],
    pageNum: 1,
    pageSize: 5,
    noMoreData: false,
    loading: false
  },

  goCloudCat() {
    wx.showToast({ icon: 'none', title: '开发中，敬请期待', duration: 1500, })
  },

  goToNoticePage() {
    wx.navigateTo({ url: '/pages/notice/notice' });
  },
  goToProtocolPage() {
    wx.navigateTo({ url: '/pages/protocol/protocol' });
  },
  goToQuestionPage() {
    wx.navigateTo({ url: '/pages/question/question' });
  },

  resetCity() {
    this.setData({ 
      pageNum: 1,
      pageSize: 5,
      areaText: "选择城市",
      queryCityCode: [],
      noMoreData: false,
    })
    setTimeout(() => {
      this.getList({ pageNum: 1, pageSize: 5 })
    }, 200)
  },

  onClickConfirm(data) {
    const { detail } = data
    const { values } = detail
    const codes = values.map(e => e.code)
    const cityTexts = values.map(e => e.name) 
    this.setData({
      pageNum: 1,
      cats: [],
      noMoreData: false,
      showAreaList: false,
      queryCityCode: codes,
      areaText: cityTexts.join('')
    })
    setTimeout(() => {
      this.getList({ pageSize: 5, pageNum: 1 })
    }, 200)
  },

  onTapQueryCity() {
    this.setData({ showAreaList: true })
  },
  
  onClose() {
    this.setData({ showAreaList: false })
  },

  onShow() {
    const refreshIndex = wx.getStorageSync('refreshIndex')
    if (refreshIndex) {
      wx.removeStorageSync('refreshIndex');
      this.resetCity()
    }
    this.getTabBar && this.getTabBar().setData({ active: 0 })
  },

  onLoad() {
    this.getList()
  },

  onClickSwiperItem(data) {
    const { detail } = data
    const { _id } = detail
    wx.navigateTo({ url: '/pages/cat-detail/cat-detail?id=' + _id });
  },

  async getList(params = { pageSize: 5, pageNum: 1 }) {      
    if (this.data.noMoreData) return
    this.setData({ loading: true })
    const { pageNum } = params
    const { queryCityCode } = this.data
    if (queryCityCode && queryCityCode.length) {
      params.city = queryCityCode[queryCityCode.length - 1]
    }
    try {
      wx.showLoading({ title: '加载中' });
      const list = await catModel.getList(params)
      if (!list || !list.length) {
        this.setData({
          noMoreData: true,
          loading: false
        })
        return
      }
      const result = this.createTags(list)
      const cats = pageNum === 1 ? result : this.data.cats.concat(result)
  
      this.setData({
        cats: cats,
        noMoreData: result.length < this.data.pageSize,
        loading: false
      })
    } catch (e) {
      console.log(e)
    } finally {
      wx.hideLoading();
    }
  },

  createTags(list) {
    const keywords = ['亲人', '已驱虫', '活泼', '有猫德', '胆小', '性格很好', '流浪猫']
    list.forEach(item => {
      const { gender, age, breed, desc, isSterilization, isVaccinated, adoptionAddressText } = item
      item.tags = []
      if (adoptionAddressText && adoptionAddressText[1]) {
        item.tags.push(adoptionAddressText[1])
      }
      item.tags.push(age)
      item.tags.push(gender === '0' ? '小王子' : '小公主')
      item.tags.push(breed)
      item.tags.push(isSterilization === '10' ? '已绝育' : '未绝育')
      item.tags.push(isVaccinated === '10' ? '已打疫苗' : '未打疫苗')
      if (desc) {
        keywords.forEach(key => {
          if (desc.indexOf(key) > -1) {
            item.tags.push(key)
          }
        })
      }
    })
    return list
  },

  onClickCatItem(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/cat-detail/cat-detail?id=' + id
    })
  },

  onReachBottom() {
    console.log('on reacth bottom')
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.getList({ pageNum: this.data.pageNum, pageSize: this.data.pageSize })
    // const cats = this.data.cats
    // for (let i = 0; i < 5; i++) {
    //   const newCat = cats[Math.floor(Math.random() * cats.length)]
    //   newCat.id = Number(newCat.id) + cats.length + i + 1
    //   cats.push(newCat)
    // }
    // this.setData({
    //   cats
    // })
  },

  addressChange(e) {
    const areaTexts = e.detail.value
    // const areaCodes = e.detail.code
    wx.showLoading()
    setTimeout(() => {
      this.setData({
        areaText: areaTexts.join(''),
        areaCodes: areaTexts
      })
      wx.hideLoading()
    }, 1000)
  },

  onShareAppMessage() {
    return {
      title: '【小狸花一家】小程序',
      path: '/pages/index/index',
      imageUrl: ''
    }
  }
});
