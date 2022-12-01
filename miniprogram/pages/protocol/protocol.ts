Page({
  data: {
    pdfFileId: 'cloud://cat-adoption-dev-5fjfdgk22f7800a.6361-cat-adoption-dev-5fjfdgk22f7800a-1312622403/system/protocol.pdf',
    imgFileId: 'cloud://cat-adoption-dev-5fjfdgk22f7800a.6361-cat-adoption-dev-5fjfdgk22f7800a-1312622403/system/protocol.jpeg',
  },
  onLoad() {

  },

  onTapImage() {
    wx.previewImage({
      current: this.data.imgFileId,
      urls: [this.data.imgFileId],
      success: (result) => {
        
      },
      fail: (e) => {
        console.log(e)
      },
      complete: () => {}
    });
  },

  openDocument() {
    wx.showLoading({ title: '加载中', mask: true })

    wx.cloud.getTempFileURL({
      fileList: [this.data.pdfFileId],
      success: (res) => {
        const { tempFileURL } = res.fileList[0]
        wx.downloadFile({
          url: tempFileURL,
          success: (result) => {
            const filePath = result.tempFilePath
            wx.openDocument({
              filePath: filePath,
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          },
          fail: console.log,
          complete: () => {
            wx.hideLoading()
          }
        });
      },
      fail: (error) => {
        console.log(error)
        wx.hideLoading()
      }
    })
  }
})