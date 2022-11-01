// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    this.globalData = {
      safeAreaHeight: 0
    };

    this.getSafeAreaHeight()
  },

  getSafeAreaHeight() {
    console.log('this.getSafeAreaHeight')
    wx.getSystemInfo({
      success: (result) => {
        console.log("getSystemInfo result :" + result)
        this.globalData.safeAreaHeight = result.safeArea.bottom - result.safeArea.height
      },
      fail: () => {},
      complete: () => {}
    });
      
  }
});
