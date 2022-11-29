// custom-tab-bar/custom-tab-bar.ts
Page({
  data: {
    active: 0,
    tabs: [
      {
        icon: "/images/index-col-1.png",
        iconActive: "/images/index-col-1.png",
        text: "毛孩子",
        path: "/pages/index/index"
      },
      {
        icon: "/images/find-adoption.png",
        iconActive: "/images/find-adoption.png",
        text: "找领养",
        path: "/pages/read-find-adoption/read-find-adoption"
      },
      {
        icon: "/images/index-col-2.png",
        iconActive: "/images/index-col-2.png",
        text: "个人中心",
        path: "/pages/mine/mine"
      }
    ]
  },

  onChange(event) {
    const index = Number(event.detail)
    console.log('index change')
    console.log(index)
    if (index === this.data.active) {
      return
    }
    this.setData({ active: index });
    wx.switchTab({
      url: this.data.tabs[index].path
    })
  }
})
