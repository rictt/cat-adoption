// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  data: {
    indexSwiperList: [
      {
        src: "https://mmbiz.qpic.cn/mmbiz_jpg/2FcICaCWCnU41nInW02HzMT3vnj4ibdsc6tnDmLlx5KW9fnF2icibeLodicTEV44GMPnF0fRcpfazoR7IcUflguIPg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1"
      },
      {
        src: "https://mmbiz.qpic.cn/mmbiz_jpg/2FcICaCWCnU41nInW02HzMT3vnj4ibdscFKuNmdRA69tQDpbPdpsZpm9KBkviaGusWnibPGo3TKkZQuQC94H0zhqA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1"
      }
    ],
    cats: [
      { 
        id: '0001',
        name: "Gucci",
        desc: "领养地址要求：广东省汕头市潮阳区xxx",
        cover: "https://mmbiz.qpic.cn/mmbiz_jpg/2FcICaCWCnU41nInW02HzMT3vnj4ibdscw2B4GBmUPS1FHPSqm8uAXzyUchMpUzMXavickaAOwe6EXmPAeH02TgA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1" ,
        tags: ["小公主", "很粘人", "乖巧", "已打疫苗"]
      },
      { 
        id: '0002',
        name: "Cook",
        desc: "领养地址要求：广东省广州市车陂街道",
        cover: "https://mmbiz.qpic.cn/mmbiz_jpg/2FcICaCWCnVggbVmiaermnHGBWKbm9lHsyXNkj6NjcAUV2AFFGI3c0Dc46p2nQWvoNPRJc05dlFuOy76kJnu76A/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1" ,
        tags: ["小公主", "已绝育", "成年", "乖巧", "已打疫苗"]
      },
      { 
        id: '0003',
        name: "DreamCat",
        desc: "领养地址要求：广东省深圳市南山区南山街道xxxx",
        cover: "https://mmbiz.qpic.cn/mmbiz_jpg/2FcICaCWCnVggbVmiaermnHGBWKbm9lHs4ibrktzfkBz5yXRnZjSoiaJpvw3qQe8UxjKz2kqd1598KHXyzrPW3VWg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1" ,
        tags: ["小王子", "很粘人", "乖巧", "已打疫苗", "半夜有点吵"]
      },
    ]
  },

  onClickCatItem(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/cat-detail/cat-detail?id=' + id
    })
  }
});
