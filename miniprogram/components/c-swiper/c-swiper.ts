
Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
    height: {
      type: Number,
      value: 500
    },
    indicatorDots: {
      type: Boolean,
      value: true
    },
    autoplay: Boolean,
    duration: {
      type: Number,
      value: 500
    },
    interval: {
      type: Number,
      value: 3000
    },
    mode: {
      type: String,
      value: "aspectFit"
    },
    preview: {
      type: Boolean,
      value: false
    }
  },
  data: {
  },

  methods: {
    clickImage(e) {
      const index = e.target.dataset.index
      const list = this.data.list
      const current = list[index].url || list[index].src

      if (!this.data.preview) {
        this.triggerEvent('click', list[index])
        return
      }
      wx.previewImage({
        current,
        urls: list.map(e => e.url || e.src),
        success: (result) => {
          
        },
        fail: (e) => {
          console.log(e)
        },
        complete: () => {}
      });
        
    }
  }
})
