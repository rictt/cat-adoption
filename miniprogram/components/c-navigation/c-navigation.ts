// components/c-navigation/c-navigation.ts
const app = getApp()

Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: String,
    backgroundColor: String,
    color: String
  },
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    capsuleHeight: app.globalData.capsuleHeight,
    capsuleWidth: app.globalData.capsuleWidth
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
