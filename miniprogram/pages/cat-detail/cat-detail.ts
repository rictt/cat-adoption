const app = getApp();
Page({
  data: {
    bottom: app.globalData.safeAreaHeight,
    catId: null,
    cat: {
      id: '0001',
      name: "Gucci",
      desc: "领养地址要求：广东省汕头市潮阳区xxx",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/2FcICaCWCnU41nInW02HzMT3vnj4ibdscw2B4GBmUPS1FHPSqm8uAXzyUchMpUzMXavickaAOwe6EXmPAeH02TgA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1",
      tags: ["小公主", "很粘人", "乖巧", "已打疫苗"],
      images: [
        { src: "https://mmbiz.qpic.cn/mmbiz_jpg/2FcICaCWCnU41nInW02HzMT3vnj4ibdscw2B4GBmUPS1FHPSqm8uAXzyUchMpUzMXavickaAOwe6EXmPAeH02TgA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1" },
        { src: "https://mmbiz.qpic.cn/mmbiz_jpg/2FcICaCWCnVggbVmiaermnHGBWKbm9lHs4ibrktzfkBz5yXRnZjSoiaJpvw3qQe8UxjKz2kqd1598KHXyzrPW3VWg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1" },
        { src: "https://mmbiz.qpic.cn/mmbiz_jpg/2FcICaCWCnVggbVmiaermnHGBWKbm9lHsyXNkj6NjcAUV2AFFGI3c0Dc46p2nQWvoNPRJc05dlFuOy76kJnu76A/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1" }
      ]
    },
  },

  onLoad(options) {
    this.setData({
      catId: options.id
    })
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