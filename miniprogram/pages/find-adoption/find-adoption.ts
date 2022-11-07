// pages/find-adoption/find-adoption.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    radio: "1",
    name: '',
    gender: '',
    // sb小程序不支持obj.key model绑定
    formKeys: ['name', 'gender'],
    formRules: {
      name: [{ required: true }],
      gender: [
        { required: true },
        { validator: (rule, value) => {
          if (value !== '1' && value !== '2') {
            return '不等于1，或者不等于2'
          }
        }}
      ]
    },
    formErrorMessage: {
      name: ''
    }
  },
  onLoad() {

  },
  onChange() {

  },

  afterRead(event) {
    const files = event.detail.file;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    this.setData({ fileList: files })
    this.uploadToCloud()
  },

  uploadToCloud() {
    const { fileList } = this.data;
    if (!fileList.length) {
      return wx.showToast({ title: '请选择图片', icon: 'none' });
    }
    const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`my-photo${index}.png`, file));
    Promise.all(uploadTasks)
      .then(data => {
        const newFileList = data.map(item => ({ url: item.fileID }));
        this.setData({ fileList: newFileList });
      })
      .catch(e => {
        wx.showToast({ title: '上传失败', icon: 'none' });
        console.log(e);
      });
  },
  
  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.url
    });
  },

  onClickSubmit() {
    wx.showToast({
      title: '请填写完整',
      icon: 'none' 
    })
    this.validate()
  },

  validate() {
    // const model = this.data.form
    const rules = this.data.formRules
    const messages = this.data.formErrorMessage
    type validType = (rules, value) => string
    
    // Object.keys(model).forEach(key => {
    this.data.formKeys.forEach(key => {
      const value = this.data[key]
      const rule = rules[key]
      const setMessageKey = `formErrorMessage.${key}`
      let isRequired: boolean|undefined = undefined
      let validators: validType[] = []

      rule.forEach(r => {
        if (r.required) {
          isRequired = true
        }
        if (r.validator) {
          validators.push(r.validator)
        }
      })

      if (!value && typeof value !== 'boolean') {
        if (isRequired) {
          this.setData({
            [setMessageKey]: '必填项'
          })
          return
        }
      }

      for (const validFun of validators) {
        const message = validFun(rule, value)
        if (message) {
          this.setData({
            [setMessageKey]: message
          })
          return
        }
      }

      this.setData({
        [setMessageKey]: ''
      })
      
    })
  }
})