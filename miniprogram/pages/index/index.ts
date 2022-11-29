import catModel from '../../model/cat'

const { envList } = require('../../envList.js')


Page({
  data: {
    areaCodes: ['广东省', '广州市', '海珠区'],
    areaText: '广州',
    indexSwiperList: [
      {
        src: "https://mmbiz.qpic.cn/mmbiz_jpg/2FcICaCWCnU41nInW02HzMT3vnj4ibdsc6tnDmLlx5KW9fnF2icibeLodicTEV44GMPnF0fRcpfazoR7IcUflguIPg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1"
      },
      {
        src: "https://mmbiz.qpic.cn/mmbiz_jpg/2FcICaCWCnU41nInW02HzMT3vnj4ibdscFKuNmdRA69tQDpbPdpsZpm9KBkviaGusWnibPGo3TKkZQuQC94H0zhqA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1"
      }
    ],
    cats: [],
    pageNum: 1,
    pageSize: 5,
    noMoreData: false,
    loading: false
  },

  onShow() {
    this.getTabBar && this.getTabBar().setData({ active: 0 })
  },

  onLoad() {
    this.getList()
  },

  async getList(params = { pageSize: 5, pageNum: 1 }) {
    if (this.data.noMoreData) return
    this.setData({
      loading: true
    })
    try {
      const list = await catModel.getList(params)
      if (!list || !list.length) {
        this.setData({
          noMoreData: true,
          loading: false
        })
        return
      }
      this.setData({
        noMoreData: false,
        cats: this.data.cats.concat(this.createTags(list)),
        loading: false
      })
    } catch (e) {
      console.log(e)
    }
  },

  createTags(list) {
    const keywords = ['亲人', '已驱虫', '活泼', '有猫德', '胆小', '性格很好', '流浪猫']
    list.forEach(item => {
      const { gender, age, breed, desc, isSterilization, isVaccinated, adoptionAddress } = item
      item.tags = []
      item.tags.push(age)
      item.tags.push(gender === '0' ? '小王子' : '小公主')
      item.tags.push(breed)
      item.tags.push(isSterilization === '10' ? '已绝育' : '未绝育')
      item.tags.push(isVaccinated === '10' ? '已打疫苗' : '未打疫苗')
      item.tags.push(adoptionAddress[1])
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
