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
    cats: []
  },

  onLoad() {
    this.getList()
  },

  async getList(params = { pageSize: 5, pageNum: 1 }) {
    try {
      const list = await catModel.getList(params)
      console.log('get list')
      console.log(list)
      this.setData({
        cats: this.data.cats.concat(list)
      })
    } catch (e) {
      console.log(e)
    }
  },

  onClickCatItem(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/cat-detail/cat-detail?id=' + id
    })
  },

  onReachBottom() {
    console.log('on reacth bottom')
    const cats = this.data.cats
    for (let i = 0; i < 5; i++) {
      const newCat = cats[Math.floor(Math.random() * cats.length)]
      newCat.id = Number(newCat.id) + cats.length + i + 1
      cats.push(newCat)
    }
    this.setData({
      cats
    })
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
  }
});
