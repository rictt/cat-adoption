import catModel from '../../model/cat'
import { areaList } from '@vant/area-data'
import apolloBehavior from '../../behaviors/apollo'


const formKeys = [
  'name', 'gender', 'age', 'imgList', 'isVaccinated',
  'isSterilization', 'desc', 'adoptionAddress', 'adoptionAddressText',
  'needReturnVisit', 'needContract', 'adoptionDesc',
  'username', 'contact', 'breed'
]
const draftsKey = 'form-drafts'

Page({
  behaviors: [apolloBehavior],
  
  data: {
    showAreaList: false,
    areaList,
    name: '',
    breed: '',
    gender: '',
    age: '',
    needReturnVisit: '',
    needContract: '',
    imgList: [],
    adoptionAddress: [],
    adoptionAddressText: '请选择',
    desc: '',
    adoptionDesc: '',
    isVaccinated: '',
    isSterilization: '',

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
    const saveForm = wx.getStorageSync(draftsKey);
    console.log("saveForm")
    console.log(saveForm)
    if (saveForm) {
      const obj = JSON.parse(saveForm)
      wx.showModal({
        title: '是否继续上次编辑',
        content: '检测到有未完成的编辑内容',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#ffa766',
        success: (result) => {
          if (result.confirm) {
            this.setData(obj)
          } else {
            wx.removeStorageSync(draftsKey);
          }
        },
        fail: () => {
          wx.removeStorageSync(draftsKey);
        }
      });
        
    }
  },

  onUnload() {
    const obj = {}
    const keys = [...formKeys]
    for (const key of keys) {
      const val = this.data[key]
      if (val)
      obj[key] = val
    }
    if (obj.name && obj.gender) {
      // 这里开始才视为有草稿内容保存
      wx.setStorageSync(draftsKey, JSON.stringify(obj))
    }
  },

  onShowAreaList() {
    this.setData({ showAreaList: true })
  },

  onClose() {
    this.setData({ showAreaList: false })
  },

  onClickConfirm(data) {
    const { detail } = data
    const { values } = detail
    const codes = values.map(e => e.code)
    const cityTexts = values.map(e => e.name) 
    this.setData({
      showAreaList: false,
      adoptionAddress: codes,
      adoptionAddressText: cityTexts
    })
  },

  onShareAppMessage() {
    return {
      title: '送养须知【小狸花一家】',
      path: '/pages/find-adoption/find-adoption',
      imageUrl: ''
    }
  },

  afterRead(event) {
    const files = event.detail.file;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    this.setData({ imgList: files })
    this.uploadToCloud()
  },

  uploadToCloud() {
    const { imgList } = this.data;
    if (!imgList.length) {
      return wx.showToast({ title: '请选择图片', icon: 'none' });
    }
    const uploadTasks = imgList.map((file, index) => this.uploadFilePromise(`cat/${Date.now()}-${index}.png`, file));
    Promise.all(uploadTasks)
      .then(data => {
        const newFileList = data.map(item => ({ url: item.fileID }));
        this.setData({ imgList: newFileList });
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


  addressChange(e) {
    console.log(e)
    const value = e.detail.value
    this.setData({
      adoptionAddress: value,
      adoptionAddressText: value.join(''),
    })
  },

  onRadioChange(e) {
    const { key } = e.target.dataset
    const value = e.detail.value
    this.setData({
      [key]: value
    })
  },

  async onClickSubmit() {
    // setTimeout(())
    const keys = [...formKeys]
    const form = {}
    const { isAudit } = this.data.apolloData
    for (const key of keys) {
      const value = this.data[key]
      if (typeof value === 'boolean' || (typeof value === 'number' && value === 0)) {
        form[key] = value
        continue
      }
      if (isAudit && (key === 'username' || key === 'contact')) {
        form[key] = value
        continue
      }
      if (!value || (Array.isArray(value) && !value.length)) {
        console.error(key + ' is not complete!')
        console.log(form)
        wx.showToast({
          title: '请填写完整',
          icon: 'none' 
        })
        return
      }
      form[key] = value
    }
    console.log(form)

    wx.showLoading({
      title: '正在提交',
      mask: true
    })
    try {
      await catModel.insert(form)
    } catch (e) {
      console.log(e)
    }
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {
          setTimeout(() => {
            wx.setStorageSync('refreshIndex', true);
            wx.switchTab({
              url: '/pages/index/index',
              success: () => {
                setTimeout(() => {
                  wx.removeStorageSync(draftsKey);
                }, 1000)
              }
            });
          }, 1000)
        },
      });
    }, 1000)
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
  },

  
})