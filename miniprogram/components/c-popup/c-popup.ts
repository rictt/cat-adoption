// components/c-popup/c-popup.ts
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    title: String,
    content: String,
    okText: String,
    cancelText: String,
    position: {
      type: String,
      value: "center"
    }
  },
  observers: {
    position(val) {
      console.log('position change')
      this.popupClass = val
    },
    visible(val) {
      this.setData({
        _visible: val
      })
    }
  },

  data: {
    popupClass: "center",
    _visible: false
  },

  methods: {
    onClose() {
      this.setData({
        _visible: false
      })
    },
    onConfirm() {
      this.triggerEvent('onConfirm')
    },
    onCancel() {
      this.triggerEvent('onCancel')
    },
  }
})
