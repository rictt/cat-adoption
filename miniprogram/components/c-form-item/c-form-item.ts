
Component({
  externalClasses: ['class'],

  options: {
  },
  
  properties: {
    value: {
      type: [String, Boolean, Number]
    },
    radioGroup: {
      type: Array
    },
    label: String,
    placeholder: String,
    type: {
      type: String,
      value: ""
    },
    required: Boolean
  },

  observers: {
    'value, radioGroup': function(numberA, numberB) {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      if (numberB) {
      }
    }
  },

  data: {
  },

  methods: {
    handleInputChange() {
    },
    onRadioChange(e) {
      let value = e.detail.value
      const type = typeof this.data.value
      if (type === 'number') {
        value = Number(value)
      }
      if (type === 'boolean') {
        value = value === 'true'
      }
      
      this.setData({
        value: value
      })
    }
  }
})
