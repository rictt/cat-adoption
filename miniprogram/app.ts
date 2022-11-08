// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      console.log('wx.cloud loaded')
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cat-adoption-dev-5fjfdgk22f7800a',
        traceUser: true,
      });
    }

    this.globalData = {
      safeAreaHeight: 0,
      statusBarHeight: 0,
      capsuleHeight: 0,
      capsuleWidth: 0
    };

    this.getPageInfo()
  },

  getPageInfo() {
    // https://www.cnblogs.com/chenwolong/p/navigationBar.html，很详细，推荐！
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync()
    console.log("getSystemInfo result :", systemInfo)
    console.log(menuButtonInfo)
    console.log("menuButtonInfo result: ", menuButtonInfo)

    // 胶囊整块的高度 = 胶囊上下边距 + 胶囊本身高度
    const capsuleHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height
    this.globalData.safeAreaHeight = systemInfo.safeArea.bottom - systemInfo.safeArea.height
    this.globalData.statusBarHeight = systemInfo.statusBarHeight
    this.globalData.capsuleHeight = capsuleHeight
  }
});
